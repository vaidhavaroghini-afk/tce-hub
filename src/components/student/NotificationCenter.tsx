import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Notification } from '../../types';
import { api } from '../../lib/api';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Filter,
  Shield,
  Layers,
  Sparkles,
  Info,
  Check
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { user, joinedSigs, refreshUserData, showToast } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedSigFilter, setSelectedSigFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const res = await api.getStudentNotifications();
      setNotifications(res.notifications || []);
    } catch (err: any) {
      console.error('Error fetching notifications', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [user?.id]);

  const handleMarkAsRead = async (notifId: string) => {
    try {
      await api.markNotificationRead(notifId);
      setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, is_read: true } : n));
      await refreshUserData();
    } catch (err) {
      // Ignore
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      await refreshUserData();
      showToast('All notifications marked as read', 'success');
    } catch (err: any) {
      showToast('Action failed', 'error');
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (selectedSigFilter === 'all') return true;
    return n.sig_id === selectedSigFilter;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div id="student-notification-center" className="space-y-6 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              SIG Notification Center
            </h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold font-mono">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Tenant-isolated broadcast stream strictly for your enrolled Special Interest Groups
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 text-xs font-semibold transition-colors shrink-0"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Tenant Privacy Notice */}
      <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Zero Notification Spill:</strong> You only receive announcements dispatched to the {joinedSigs.length} SIGs you belong to.
          </span>
        </div>
      </div>

      {/* Filter by Joined SIG */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setSelectedSigFilter('all')}
          className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
            selectedSigFilter === 'all'
              ? 'bg-rose-900 text-white shadow-2xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          All Joined SIGs ({notifications.length})
        </button>

        {joinedSigs.map((js) => (
          <button
            key={js.sig_id}
            onClick={() => setSelectedSigFilter(js.sig_id)}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              selectedSigFilter === js.sig_id
                ? 'bg-rose-900 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <span>{js.logo || '🚀'}</span>
            <span>{js.sig_name}</span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifs.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center bg-stone-50 space-y-2">
          <Bell className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="text-sm font-bold text-stone-800">No notifications found</h3>
          <p className="text-xs text-stone-500">
            You're all caught up with your joined SIG announcements.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.is_read && handleMarkAsRead(notif.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                notif.is_read
                  ? 'bg-white border-stone-200 opacity-80'
                  : 'bg-rose-50/40 border-rose-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-900">
                      {notif.sig_name || 'Enrolled SIG'}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      notif.priority === 'urgent'
                        ? 'bg-rose-600 text-white'
                        : notif.priority === 'high'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {notif.priority}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      {new Date(notif.created_at).toLocaleString()}
                    </span>
                  </div>

                  <h3 className={`text-sm font-bold ${notif.is_read ? 'text-stone-800' : 'text-stone-900 font-extrabold'}`}>
                    {notif.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="pt-1 text-[11px] text-stone-400">
                    Sender: <strong className="text-stone-700">{notif.sender_name}</strong>
                  </div>
                </div>

                {!notif.is_read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0 mt-1"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
