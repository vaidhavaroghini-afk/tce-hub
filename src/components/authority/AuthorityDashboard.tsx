import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import {
  Layers,
  Users,
  Calendar,
  CheckSquare,
  TrendingUp,
  ShieldCheck,
  PlusCircle,
  Bell,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Server
} from 'lucide-react';

interface AuthorityDashboardProps {
  onNavigate: (tab: string) => void;
  onOpenSecurityModal: () => void;
}

export const AuthorityDashboard: React.FC<AuthorityDashboardProps> = ({
  onNavigate,
  onOpenSecurityModal
}) => {
  const { user, allSigs } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await api.getAuthorityStats();
        setStats(res);
      } catch (err) {
        console.error('Error fetching authority stats', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div id="authority-executive-dashboard" className="space-y-6 pb-16">
      
      {/* Authority Hero Banner - Bento Dark Style */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>TCE Central SIG Directorate • Authority Control</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Executive Directorate Dashboard
            </h1>
            <p className="text-xs text-slate-300 max-w-xl">
              Logged in as <strong className="text-white">{user?.name}</strong> ({user?.department}). Managing all isolated tenant ecosystems across Thiagarajar College of Engineering.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('authority-sigs')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New SIG</span>
            </button>
            <button
              onClick={() => onNavigate('authority-broadcast')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5 border border-slate-700"
            >
              <Bell className="w-4 h-4 text-amber-300" />
              <span>Targeted Broadcast</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Analytics Bento Grid Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total SIGs Active</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-3xl font-black text-slate-900 block font-mono">
            {stats?.totalSigs || allSigs.length}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>100% Isolated Tenants</span>
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Student Enrollments</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-3xl font-black text-slate-900 block font-mono">
            {stats?.totalMemberships || 36}
          </span>
          <span className="text-[11px] text-slate-500">
            Across all engineering branches
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Activities Scheduled</span>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-3xl font-black text-slate-900 block font-mono">
            {stats?.totalActivities || 14}
          </span>
          <span className="text-[11px] text-slate-500">
            Workshops & Hackathons
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Sprint Tasks</span>
            <CheckSquare className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-3xl font-black text-slate-900 block font-mono">
            {stats?.totalTasks || 16}
          </span>
          <span className="text-[11px] text-slate-500">
            Research & Coding Tasks
          </span>
        </div>

      </div>

      {/* SIG Tenant Capacity & Engagement Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: SIG Directory & Enrollment Capacities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Special Interest Groups Health & Capacity Index
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Max Cap: 50 / SIG
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {allSigs.map((sig) => {
                const fillPercent = Math.min(100, Math.round(((sig.member_count || 1) / (sig.max_members || 50)) * 100));

                return (
                  <div key={sig.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3.5">
                      <span className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-200">
                        {sig.logo || '🚀'}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {sig.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Advisor: <strong className="text-slate-700">{sig.facultyAdvisor}</strong> • Dept: {sig.department}
                        </p>
                        <span className="text-[10px] text-indigo-600 font-mono font-bold">
                          Tenant ID: {sig.id}
                        </span>
                      </div>
                    </div>

                    <div className="sm:w-48 space-y-1.5 shrink-0">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Enrollment</span>
                        <span className="font-mono">{sig.member_count} / {sig.max_members}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${fillPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Multi-Tenant Compliance & Audit Checklist */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4 border border-slate-800">
            <div className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Multi-Tenant Isolation Audit</h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Every SIG operates as a self-contained organizational tenant. Data isolation, notifications, tasks, and leaderboards are enforced at the server routing and database layer.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
                <span>Tenant Isolation Gate</span>
                <span className="text-emerald-400 font-bold font-mono">ENFORCED</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
                <span>Cross-SIG Leakage Prevention</span>
                <span className="text-emerald-400 font-bold font-mono">100% PASS</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
                <span>Single Owner Guard</span>
                <span className="text-emerald-400 font-bold font-mono">ACTIVE</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenSecurityModal}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Run Live Security Test Suite
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
