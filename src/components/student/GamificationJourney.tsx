import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Award,
  Trophy,
  Flame,
  Zap,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

export const GamificationJourney: React.FC = () => {
  const { user, joinedSigs } = useAuth();

  const points = user?.points || 120;
  const currentLevel = points > 400 ? 'Level 4: Research Fellow' : points > 250 ? 'Level 3: Senior Builder' : points > 100 ? 'Level 2: Active Explorer' : 'Level 1: Novice';
  const nextMilestone = points > 400 ? 600 : points > 250 ? 400 : points > 100 ? 250 : 100;
  const progressPercent = Math.min(100, Math.round((points / nextMilestone) * 100));

  const allBadges = [
    {
      id: 'b1',
      title: 'TCE SIG Pioneer',
      description: 'Joined your first Special Interest Group at Thiagarajar College of Engineering',
      icon: '🏛️',
      earned: true,
      earnedDate: 'August 2026'
    },
    {
      id: 'b2',
      title: 'Multi-Tenant Polymath',
      description: 'Enrolled in 2 or more diverse engineering domain SIGs simultaneously',
      icon: '🔮',
      earned: joinedSigs.length >= 2,
      earnedDate: joinedSigs.length >= 2 ? 'Active' : undefined
    },
    {
      id: 'b3',
      title: 'Sprint Finisher',
      description: 'Completed 3 hands-on technical milestone sprint tasks',
      icon: '⚡',
      earned: points >= 150,
      earnedDate: points >= 150 ? 'Active' : undefined
    },
    {
      id: 'b4',
      title: 'Workshop Virtuoso',
      description: 'Attended 2 technical symposium workshops with 100% lab completion',
      icon: '🛠️',
      earned: points >= 200,
      earnedDate: points >= 200 ? 'Active' : undefined
    },
    {
      id: 'b5',
      title: 'Grandmaster Contributor',
      description: 'Accumulate 500+ total SIG ecosystem achievement points',
      icon: '👑',
      earned: points >= 500,
      earnedDate: points >= 500 ? 'Active' : undefined
    }
  ];

  return (
    <div id="student-gamification-journey" className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Header Banner - Bento Dark */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Gamified SIG Experience</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {user?.name}'s Growth Journey
            </h1>
            <p className="text-xs text-slate-300 max-w-md">
              Earn verified points through task submissions, workshop attendance, and cross-SIG research activities.
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 text-center min-w-[180px] shadow-inner">
            <span className="text-[11px] text-slate-400 uppercase font-semibold block tracking-wider">
              Total Points
            </span>
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              {points}
            </span>
            <span className="text-[10px] text-slate-300 block mt-1 font-medium">
              {currentLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Progress to Next Level - Bento Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Level Progression</h3>
            <p className="text-xs text-slate-500">
              {nextMilestone - points > 0 ? `${nextMilestone - points} points to next ranking milestone` : 'Max Rank Attained!'}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600">
            {points} / {nextMilestone} pts ({progressPercent}%)
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-slate-900">Earned & Milestone Badges</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allBadges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-3 ${
                badge.earned
                  ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                    {badge.icon}
                  </span>
                  {badge.earned ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-slate-900">
                  {badge.title}
                </h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              {badge.earnedDate && (
                <div className="text-[10px] text-indigo-700 font-semibold pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span>Status</span>
                  <span className="font-mono">{badge.earnedDate}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
