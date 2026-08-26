import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import {
  Bell,
  Send,
  Shield,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';

export const TargetedBroadcast: React.FC = () => {
  const { allSigs, showToast } = useAuth();

  const [selectedSigIds, setSelectedSigIds] = useState<string[]>([]);
  const [broadcastTarget, setBroadcastTarget] = useState<'specific' | 'all'>('specific');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal');
  const [isSending, setIsSending] = useState(false);

  const toggleSigSelection = (sigId: string) => {
    if (selectedSigIds.includes(sigId)) {
      setSelectedSigIds(selectedSigIds.filter(id => id !== sigId));
    } else {
      setSelectedSigIds([...selectedSigIds, sigId]);
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const targets = broadcastTarget === 'all' ? allSigs.map(s => s.id) : selectedSigIds;

    if (targets.length === 0) {
      showToast('Please select at least one target SIG tenant.', 'error');
      return;
    }

    try {
      setIsSending(true);
      const res = await api.broadcastNotification({
        targetSigIds: targets,
        title,
        message,
        priority
      });

      showToast(res.message || 'Targeted notification dispatched successfully!', 'success');
      setTitle('');
      setMessage('');
      setSelectedSigIds([]);
    } catch (err: any) {
      showToast(err.message || 'Broadcast failed', 'error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="authority-targeted-broadcast" className="space-y-6 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Targeted Multi-Tenant Announcement Dispatcher
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Broadcast official circulars, competition alerts, and guidelines isolated to selected SIG cohorts
        </p>
      </div>

      {/* Isolation Guarantee Banner - Bento Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start space-x-3 text-xs text-slate-700">
        <Shield className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900">Tenant Targeting Rules</h4>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            When you dispatch a broadcast, the backend maps announcements exclusively to the students enrolled in the targeted SIG IDs. Students outside the target SIGs will not receive the notification, maintaining tenant boundary hygiene.
          </p>
        </div>
      </div>

      {/* Broadcast Form - Bento Card */}
      <form onSubmit={handleSendBroadcast} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        {/* Step 1: Target Audience Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            1. Select Target SIG Cohorts *
          </label>

          <div className="flex items-center space-x-3 text-xs">
            <button
              type="button"
              onClick={() => setBroadcastTarget('specific')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                broadcastTarget === 'specific'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Select Specific SIGs
            </button>
            <button
              type="button"
              onClick={() => setBroadcastTarget('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                broadcastTarget === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              All {allSigs.length} SIG Tenants (Campus-wide)
            </button>
          </div>

          {broadcastTarget === 'specific' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 max-h-56 overflow-y-auto pr-1">
              {allSigs.map((sig) => {
                const isSelected = selectedSigIds.includes(sig.id);
                return (
                  <button
                    key={sig.id}
                    type="button"
                    onClick={() => toggleSigSelection(sig.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span>{sig.logo || '🚀'}</span>
                      <span className="truncate">{sig.name}</span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 2: Content */}
        <div className="space-y-4 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
              2. Announcement Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mandatory Lab Safety & Pre-Hackathon Briefing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none bg-white text-xs"
              >
                <option value="low">Low (General Update)</option>
                <option value="normal">Normal (Standard Announcement)</option>
                <option value="high">High (Action Required)</option>
                <option value="urgent">Urgent (Immediate Attention)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
              Notification Message & Instructions *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Draft your broadcast details, room allocations, deliverables, or deadlines..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-xs"
            />
          </div>
        </div>

        {/* Step 3: Dispatch */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Recipients: <strong className="text-slate-800">
              {broadcastTarget === 'all' ? `All ${allSigs.length} SIG cohorts` : `${selectedSigIds.length} SIG cohorts`}
            </strong>
          </span>

          <button
            type="submit"
            disabled={isSending || (!selectedSigIds.length && broadcastTarget === 'specific')}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-xs flex items-center space-x-2 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSending ? 'Dispatching...' : 'Dispatch Broadcast'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
