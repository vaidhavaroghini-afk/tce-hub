import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Sparkles, ChevronRight, Shield, RefreshCw, BookOpen, GraduationCap } from 'lucide-react';
import { api } from '../lib/api';

export const DemoSwitcher: React.FC = () => {
  const { user, switchUser, showToast, refreshUserData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [filterRole, setFilterRole] = useState<'all' | 'students' | 'teachers' | 'authority'>('all');

  const demoAccounts = [
    {
      id: 'user-student-d',
      name: 'Vaidha Varoghini',
      role: 'student',
      department: 'CSE (3rd Year)',
      tag: 'Multi-SIG Student',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-950',
      description: 'Enrolled in: AI SIG, CP SIG, IoT SIG, Robotics SIG'
    },
    {
      id: 'user-teacher-deisy',
      name: 'Dr. C. Deisy',
      role: 'teacher',
      department: 'CSE (HOD & Professor)',
      tag: 'Faculty Advisor',
      color: 'border-indigo-500 bg-indigo-50 text-indigo-950',
      description: 'Advising: AI & Machine Learning, Competitive Programming'
    },
    {
      id: 'user-teacher-alaguraja',
      name: 'Dr. R. A. Alaguraja',
      role: 'teacher',
      department: 'IT (Assoc. Professor)',
      tag: 'Faculty Advisor',
      color: 'border-teal-500 bg-teal-50 text-teal-950',
      description: 'Advising: Cybersecurity & Infosec, Mobile App Dev'
    },
    {
      id: 'user-teacher-balamurugan',
      name: 'Dr. M. S. Balamurugan',
      role: 'teacher',
      department: 'ECE (Professor)',
      tag: 'Faculty Advisor',
      color: 'border-purple-500 bg-purple-50 text-purple-950',
      description: 'Advising: IoT Embedded Systems, VLSI Semiconductor'
    },
    {
      id: 'user-teacher-kumaraguruparan',
      name: 'Dr. G. Kumaraguruparan',
      role: 'teacher',
      department: 'Mech & Mechatronics',
      tag: 'Faculty Advisor',
      color: 'border-orange-500 bg-orange-50 text-orange-950',
      description: 'Advising: Robotics SIG, EV & Battery, CAD/CAM'
    },
    {
      id: 'user-teacher-kavitha',
      name: 'Dr. S. Kavitha',
      role: 'teacher',
      department: 'Civil (Assoc. Professor)',
      tag: 'Faculty Advisor',
      color: 'border-stone-500 bg-stone-50 text-stone-950',
      description: 'Advising: Smart Structures, BIM & GIS Mapping'
    },
    {
      id: 'user-teacher-ramesh',
      name: 'Dr. K. Ramesh',
      role: 'teacher',
      department: 'EEE (Professor)',
      tag: 'Faculty Advisor',
      color: 'border-amber-500 bg-amber-50 text-amber-950',
      description: 'Advising: Renewable Energy Smart Grids, EV Drives'
    },
    {
      id: 'user-student-a',
      name: 'Karthik S.',
      role: 'student',
      department: 'CSE (3rd Year)',
      tag: 'Student (2 SIGs)',
      color: 'border-blue-500 bg-blue-50 text-blue-950',
      description: 'Enrolled in: AI SIG, Data Science SIG'
    },
    {
      id: 'user-student-b',
      name: 'Priya R.',
      role: 'student',
      department: 'IT (2nd Year)',
      tag: 'Student (2 SIGs)',
      color: 'border-purple-500 bg-purple-50 text-purple-950',
      description: 'Enrolled in: Web Development SIG, UI/UX SIG'
    },
    {
      id: 'user-student-c',
      name: 'Anand M.',
      role: 'student',
      department: 'ECE (4th Year)',
      tag: 'Student (2 SIGs)',
      color: 'border-amber-500 bg-amber-50 text-amber-950',
      description: 'Enrolled in: Cybersecurity SIG, Cloud SIG'
    },
    {
      id: 'user-admin-ai',
      name: 'Vignesh K.',
      role: 'sig_owner',
      department: 'CSE (SIG Lead)',
      tag: 'Student Lead',
      color: 'border-rose-500 bg-rose-50 text-rose-950',
      description: 'Student Lead of Artificial Intelligence SIG'
    },
    {
      id: 'user-auth-dean',
      name: 'Dr. M. Palaninatha Raja',
      role: 'authority',
      department: 'Dean & Chief Coordinator',
      tag: 'Central Authority',
      color: 'border-slate-800 bg-slate-100 text-slate-950',
      description: 'Global Oversight & All SIGs Directorate'
    }
  ];

  const handleResetData = async () => {
    try {
      setIsResetting(true);
      await api.resetDemoData();
      await refreshUserData();
      showToast('Database reset to clean initial demo state', 'success');
    } catch (err: any) {
      showToast('Demo data reset failed', 'error');
    } finally {
      setIsResetting(false);
    }
  };

  const filteredAccounts = demoAccounts.filter(acc => {
    if (filterRole === 'students') return acc.role === 'student' || acc.role === 'sig_owner';
    if (filterRole === 'teachers') return acc.role === 'teacher';
    if (filterRole === 'authority') return acc.role === 'authority';
    return true;
  });

  return (
    <div id="demo-persona-switcher" className="fixed bottom-4 left-4 z-40">
      {isOpen ? (
        <div className="w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 text-slate-800 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Live Multi-Tenant Switcher
                </h4>
                <p className="text-[10px] text-slate-500">Switch Students, Teachers & Authority</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-xs font-bold px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1 mb-2.5 pb-2 border-b border-slate-100 text-[10px]">
            <button
              onClick={() => setFilterRole('all')}
              className={`px-2 py-0.5 rounded-lg font-bold ${
                filterRole === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterRole('students')}
              className={`px-2 py-0.5 rounded-lg font-bold ${
                filterRole === 'students' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setFilterRole('teachers')}
              className={`px-2 py-0.5 rounded-lg font-bold ${
                filterRole === 'teachers' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Teachers
            </button>
            <button
              onClick={() => setFilterRole('authority')}
              className={`px-2 py-0.5 rounded-lg font-bold ${
                filterRole === 'authority' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Authority
            </button>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {filteredAccounts.map((acc) => {
              const isCurrent = user?.id === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={async () => {
                    await switchUser(acc.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">{acc.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${acc.color}`}>
                        {acc.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{acc.description}</p>
                  </div>
                  {isCurrent ? (
                    <span className="text-[10px] font-bold text-indigo-700 px-2 py-0.5 rounded bg-indigo-100/70 shrink-0">
                      Active
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <button
              onClick={handleResetData}
              disabled={isResetting}
              className="flex items-center space-x-1 text-slate-500 hover:text-indigo-600"
            >
              <RefreshCw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
              <span>Reset Demo Seed</span>
            </button>
            <span className="text-slate-400 font-medium">TCE Autonomous</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-slate-800 group"
          title="Switch Demo Student, Teacher & Authority Accounts"
        >
          <Users className="w-4 h-4 text-indigo-400" />
          <span>Switch Persona ({user?.role === 'teacher' ? 'Teacher' : user?.role === 'authority' ? 'Deanery' : 'Student'})</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      )}
    </div>
  );
};
