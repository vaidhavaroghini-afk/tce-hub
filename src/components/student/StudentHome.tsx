import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SIG } from '../../types';
import { api } from '../../lib/api';
import {
  Sparkles,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Award,
  Layers,
  Compass,
  Bell,
  ChevronRight,
  TrendingUp,
  MapPin,
  BookOpen
} from 'lucide-react';

interface StudentHomeProps {
  onNavigate: (tab: string) => void;
  onSelectSig: (sigId: string) => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({ onNavigate, onSelectSig }) => {
  const { user, joinedSigs, activeSigId, activeSig, allSigs, setActiveSigId } = useAuth();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [mySigsDetailed, setMySigsDetailed] = useState<any[]>([]);
  const [recentNotifs, setRecentNotifs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const [recsRes, mySigsRes, notifsRes] = await Promise.all([
          api.getRecommendations().catch(() => ({ recommendations: [] })),
          api.getMySigs().catch(() => ({ mySigs: [] })),
          api.getStudentNotifications().catch(() => ({ notifications: [] }))
        ]);

        setRecommendations(recsRes.recommendations || []);
        setMySigsDetailed(mySigsRes.mySigs || []);
        setRecentNotifs((notifsRes.notifications || []).slice(0, 3));
      } catch (err) {
        console.error('Error fetching home dashboard data', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, [user?.id, activeSigId]);

  const upcomingCount = mySigsDetailed.reduce((acc, s) => acc + (s.upcomingEvent ? 1 : 0), 0);
  const pendingTasksTotal = mySigsDetailed.reduce((acc, s) => acc + (s.pendingTasksCount || 0), 0);

  return (
    <div id="student-home-dashboard" className="space-y-6 pb-16">
      
      {/* Bento Grid Top Section: 12-Column Asymmetric Bento Cards */}
      <div className="grid grid-cols-12 gap-4">
        
        {/* Bento Hero Card (8 cols) */}
        <div className="col-span-12 lg:col-span-8 bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          {/* Subtle Background Geometry */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute right-24 top-6 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Thiagarajar College of Engineering • SIG Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
              Welcome back, {user?.name || 'Student'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              {user?.department} • {user?.year} • Roll No: <strong className="text-white font-mono">{user?.rollNo || '23CS105'}</strong>
            </p>
          </div>

          <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-indigo-200 font-medium">Active Context:</span>
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{activeSig ? activeSig.name : 'Select Active SIG'}</span>
              </span>
            </div>

            {activeSig ? (
              <button
                onClick={() => onNavigate('workspace')}
                className="px-4 py-2 rounded-xl bg-white text-indigo-700 text-xs font-bold hover:bg-indigo-50 transition-colors shadow-sm flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('explore')}
                className="px-4 py-2 rounded-xl bg-white text-indigo-700 text-xs font-bold hover:bg-indigo-50 transition-colors shadow-sm flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Browse & Join SIGs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bento Profile / Quick Stats Tile (4 cols) */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student Summary</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              Autonomous
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 my-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[11px] text-slate-500 font-semibold block">Joined SIGs</span>
              <span className="text-xl font-bold text-slate-900 font-mono mt-0.5 block">{joinedSigs.length}</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-center">
              <span className="text-[11px] text-amber-800 font-semibold block">Upcoming Events</span>
              <span className="text-xl font-bold text-amber-900 font-mono mt-0.5 block">{upcomingCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[11px] text-slate-500 font-semibold block">Tasks Due</span>
              <span className="text-xl font-bold text-slate-900 font-mono mt-0.5 block">{pendingTasksTotal}</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-center">
              <span className="text-[11px] text-emerald-800 font-semibold block">SIG XP Points</span>
              <span className="text-xl font-bold text-emerald-700 font-mono mt-0.5 block">{user?.points || 0}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('journey')}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>View Gamification Journey</span>
          </button>
        </div>

      </div>

      {/* Bento Middle Row: 3 Modular Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Active SIG Highlights / Next Schedule */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <Layers className="w-4 h-4" />
              </span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Current SIG Focus</h3>
            </div>
            {activeSig && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Online
              </span>
            )}
          </div>

          {activeSig ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{activeSig.logo || '🚀'}</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeSig.name}</h4>
                  <p className="text-xs text-slate-500">{activeSig.category} • {activeSig.department}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {activeSig.description}
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Roster Capacity</span>
                <span className="font-bold text-slate-900 font-mono">{activeSig.member_count} / {activeSig.max_members}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-2">
              <Compass className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No active SIG context selected.</p>
              <button
                onClick={() => onNavigate('explore')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Choose from catalog
              </button>
            </div>
          )}

          <button
            onClick={() => activeSig ? onNavigate('workspace') : onNavigate('explore')}
            className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>{activeSig ? 'Launch Active Workspace' : 'Explore All Groups'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Isolated Targeted Announcements */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <Bell className="w-4 h-4" />
              </span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">SIG Feed</h3>
            </div>
            <button
              onClick={() => onNavigate('notifications')}
              className="text-[11px] font-bold text-indigo-600 hover:underline"
            >
              All Alerts
            </button>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-48">
            {recentNotifs.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">
                No recent announcements from your joined SIGs.
              </div>
            ) : (
              recentNotifs.map((notif) => (
                <div
                  key={notif.id}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                      {notif.sig_name || 'Joined SIG'}
                    </span>
                    <span className="text-[9px] text-slate-400">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 mt-1 truncate">{notif.title}</h5>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{notif.message}</p>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => onNavigate('calendar')}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center space-x-1"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Open Events Schedule</span>
          </button>
        </div>

        {/* Card 3: AI Smart Match Recommendations (Dark Bento Styling) */}
        <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-amber-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Recommended SIGs</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              AI Matched
            </span>
          </div>

          <div className="space-y-2.5 flex-1">
            {recommendations.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">You are enrolled in all top recommendations!</p>
            ) : (
              recommendations.slice(0, 2).map((rec) => (
                <div
                  key={rec.sig.id}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5 hover:border-slate-600 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-lg">{rec.sig.logo}</span>
                      <span className="text-xs font-bold text-white truncate">{rec.sig.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 shrink-0 font-mono">
                      {rec.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 line-clamp-1">
                    💡 {rec.reason}
                  </p>
                  <button
                    onClick={() => {
                      onSelectSig(rec.sig.id);
                      onNavigate('explore');
                    }}
                    className="w-full py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition-colors"
                  >
                    View & Join SIG
                  </button>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center justify-center space-x-1"
          >
            <span>Discover All {allSigs.length} SIGs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Bento Bottom Row: My Joined SIGs Bento Grid */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Enrolled Special Interest Groups</h2>
              <p className="text-xs text-slate-500">Select any group to switch active tenant workspace</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 hover:underline"
          >
            <span>Browse Full Catalog ({allSigs.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {mySigsDetailed.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center bg-white space-y-3">
            <Compass className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No SIGs Joined Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Thiagarajar College of Engineering offers specialized student interest groups in AI, Cloud, Cybersecurity, Mechatronics, and more.
            </p>
            <button
              onClick={() => onNavigate('explore')}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
            >
              Browse & Join SIGs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mySigsDetailed.map((sig) => {
              const isActive = sig.id === activeSigId;
              return (
                <div
                  key={sig.id}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between relative bg-white ${
                    isActive
                      ? 'border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-100">{sig.logo || '🚀'}</span>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-snug">
                            {sig.name}
                          </h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                            {sig.category}
                          </span>
                        </div>
                      </div>
                      {isActive && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Active</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {sig.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sig.member_count || 30}/{sig.max_members || 50}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        Role: <strong className="text-indigo-600 uppercase">{sig.userRole || 'Member'}</strong>
                      </span>
                    </div>

                    {sig.upcomingEvent && (
                      <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-100 text-[11px] text-amber-900 flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <div className="truncate">
                          <span className="font-bold truncate block">{sig.upcomingEvent.title}</span>
                          <span className="text-amber-700/80 text-[10px]">{sig.upcomingEvent.date} • {sig.upcomingEvent.venue}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-2">
                    <button
                      onClick={() => {
                        setActiveSigId(sig.id);
                        onNavigate('workspace');
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-700'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      <span>{isActive ? 'Enter Active Workspace' : 'Set as Active & Open'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
