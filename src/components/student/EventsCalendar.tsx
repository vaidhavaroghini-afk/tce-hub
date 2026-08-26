import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Activity } from '../../types';
import { api } from '../../lib/api';
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Filter,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const EventsCalendar: React.FC = () => {
  const { user, joinedSigs, allSigs } = useAuth();
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'joined' | 'all'>('joined');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        // Fetch activities across all or joined SIGs
        const sigsToFetch = selectedFilter === 'joined' ? joinedSigs.map(s => s.sig_id) : allSigs.map(s => s.id);
        
        const activityPromises = sigsToFetch.map(sigId =>
          api.getActivities(sigId).then(res => res.activities || []).catch(() => [])
        );

        const results = await Promise.all(activityPromises);
        const flattened = results.flat();
        // Sort by date
        flattened.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setAllActivities(flattened);
      } catch (err) {
        console.error('Error fetching calendar events', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [selectedFilter, joinedSigs, allSigs]);

  return (
    <div id="student-events-calendar" className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            TCE SIG Events & Workshop Schedule
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Technical symposiums, hackathons, and hands-on laboratory workshops
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
          <button
            onClick={() => setSelectedFilter('joined')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              selectedFilter === 'joined'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Joined SIGs ({joinedSigs.length})
          </button>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              selectedFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Campus SIGs
          </button>
        </div>
      </div>

      {/* Events Timeline / List */}
      {allActivities.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center bg-slate-50 space-y-2">
          <CalendarIcon className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No events found in this view</h3>
          <p className="text-xs text-slate-500">
            {selectedFilter === 'joined'
              ? 'None of your joined SIGs have active events. Try switching to "All Campus SIGs".'
              : 'No scheduled activities found across any SIG.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {allActivities.map((act) => {
            const isRegistered = act.registeredUserIds?.includes(user?.id || '');
            const targetSig = allSigs.find(s => s.id === act.sig_id);

            return (
              <div
                key={act.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 text-center min-w-[72px] border border-indigo-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-indigo-600">
                      {new Date(act.date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-xl font-black text-indigo-950 block leading-none">
                      {new Date(act.date).getDate()}
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium block mt-0.5">
                      {act.time.split(' ')[0]}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                        {targetSig?.name || act.sig_id}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase">
                        {act.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">
                      {act.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">
                      {act.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{act.time}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{act.venue}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{act.registeredCount || 0}/{act.maxParticipants} Registered</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center md:flex-col md:items-end justify-between gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  {isRegistered ? (
                    <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Registered</span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">
                      Open to {targetSig?.name} members
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
