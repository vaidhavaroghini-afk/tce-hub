import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  BookOpen,
  Shield,
  User,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  CheckCircle2,
  ExternalLink,
  Users
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginUser, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'authority'>('student');
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const demoStudents = [
    {
      id: 'user-student-d',
      name: 'Vaidha Varoghini',
      email: 'vaidhavaroghini@student.tce.edu',
      department: 'Computer Science & Engineering',
      year: '3rd Year B.Tech',
      tag: 'Joined 4 SIGs',
      sigs: 'AI, CP, IoT, Robotics'
    },
    {
      id: 'user-student-a',
      name: 'Karthik S.',
      email: 'karthik.s@student.tce.edu',
      department: 'Computer Science & Engineering',
      year: '3rd Year B.E',
      tag: 'Joined 2 SIGs',
      sigs: 'AI & Data Science'
    },
    {
      id: 'user-student-b',
      name: 'Priya R.',
      email: 'priya.r@student.tce.edu',
      department: 'Information Technology',
      year: '2nd Year B.Tech',
      tag: 'Joined 2 SIGs',
      sigs: 'Web Development & UI/UX'
    },
    {
      id: 'user-student-c',
      name: 'Anand M.',
      email: 'anand.m@student.tce.edu',
      department: 'Electronics & Communication',
      year: '4th Year B.E',
      tag: 'Joined 2 SIGs',
      sigs: 'Cybersecurity & Cloud'
    }
  ];

  const demoTeachers = [
    {
      id: 'user-teacher-deisy',
      name: 'Dr. C. Deisy',
      email: 'dr.c.deisy@tce.edu',
      designation: 'Professor & Head of Department',
      department: 'Computer Science & Engineering',
      advisedSigs: 'AI & Machine Learning SIG, Competitive Programming SIG',
      cabin: 'CSE Block Room 204'
    },
    {
      id: 'user-teacher-alaguraja',
      name: 'Dr. R. A. Alaguraja',
      email: 'dr.r.alaguraja@tce.edu',
      designation: 'Associate Professor & Security Lab In-charge',
      department: 'Information Technology',
      advisedSigs: 'Cybersecurity & Infosec SIG, Mobile App Dev SIG',
      cabin: 'IT Block Room 108'
    },
    {
      id: 'user-teacher-balamurugan',
      name: 'Dr. M. S. Balamurugan',
      email: 'dr.m.balamurugan@tce.edu',
      designation: 'Professor & Cadence VLSI Research Head',
      department: 'Electronics & Communication',
      advisedSigs: 'IoT & Embedded Systems SIG, VLSI Semiconductor SIG',
      cabin: 'ECE Block Room 312'
    },
    {
      id: 'user-teacher-kumaraguruparan',
      name: 'Dr. G. Kumaraguruparan',
      email: 'dr.g.kumaraguruparan@tce.edu',
      designation: 'Associate Professor & Robotics Lab Lead',
      department: 'Mechanical & Mechatronics',
      advisedSigs: 'Robotics SIG, EV & Battery SIG, 3D Additive Mech SIG',
      cabin: 'Mechatronics Room MTR-102'
    },
    {
      id: 'user-teacher-kavitha',
      name: 'Dr. S. Kavitha',
      email: 'dr.s.kavitha@tce.edu',
      designation: 'Associate Professor & GIS Lab Head',
      department: 'Civil Engineering',
      advisedSigs: 'Smart Structures, BIM & GIS Mapping SIG',
      cabin: 'Civil Block Room CE-206'
    },
    {
      id: 'user-teacher-ramesh',
      name: 'Dr. K. Ramesh',
      email: 'dr.k.ramesh@tce.edu',
      designation: 'Professor & Power Systems In-charge',
      department: 'Electrical & Electronics Engineering',
      advisedSigs: 'Renewable Smart Grids SIG, EV Drives SIG',
      cabin: 'EEE Block Room EE-115'
    }
  ];

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      showToast('Please enter your TCE email address.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await loginUser(emailInput.trim(), activeTab);
      showToast(`Successfully logged in as ${emailInput}`, 'success');
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Login failed. Please check your credentials.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (email: string) => {
    try {
      setIsSubmitting(true);
      await loginUser(email, activeTab);
      showToast(`Welcome! Logged in as ${email}`, 'success');
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              T
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                TCE SIGConnect Portal Login
              </h3>
              <p className="text-xs text-slate-400">
                Thiagarajar College of Engineering • Dedicated Role-Based Authentication
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
          >
            ✕
          </button>
        </div>

        {/* Role Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('student')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-2xl font-bold text-xs transition-all ${
              activeTab === 'student'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Login</span>
          </button>

          <button
            onClick={() => setActiveTab('teacher')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-2xl font-bold text-xs transition-all ${
              activeTab === 'teacher'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Teacher / Faculty Login</span>
          </button>

          <button
            onClick={() => setActiveTab('authority')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-2xl font-bold text-xs transition-all ${
              activeTab === 'authority'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Deanery / Authority</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50">
          
          {/* Direct Email Input Form */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Sign In with TCE Institutional Email
            </h4>
            <form onSubmit={handleCustomLogin} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder={
                    activeTab === 'student'
                      ? 'e.g. vaidhavaroghini@student.tce.edu'
                      : activeTab === 'teacher'
                      ? 'e.g. dr.c.deisy@tce.edu'
                      : 'e.g. sig.coordinator@tce.edu'
                  }
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center space-x-1.5"
              >
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Quick 1-Click Role Accounts */}
          {activeTab === 'student' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Quick Select Demo Student (Join Multiple SIGs)
                </h4>
                <span className="text-[11px] text-slate-500">Instant Access</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {demoStudents.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => handleQuickLogin(st.email)}
                    disabled={isSubmitting}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-xs text-left transition-all group flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {st.name}
                        </p>
                        <span className="text-[10px] text-slate-500 font-mono">{st.email}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {st.tag}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{st.department}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'teacher' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Quick Select Faculty Advisor & Teacher Accounts
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Teachers can inspect enrolled student rosters and broadcast classroom/event notices.
                  </p>
                </div>
                <span className="text-[11px] text-slate-500">6 Faculty Accounts</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {demoTeachers.map((teach) => (
                  <button
                    key={teach.id}
                    onClick={() => handleQuickLogin(teach.email)}
                    disabled={isSubmitting}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-xs text-left transition-all group flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {teach.name}
                        </p>
                        <span className="text-[10px] text-slate-500 font-medium">{teach.designation}</span>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{teach.email}</p>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        {teach.department.split(' ')[0]}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px]">
                      <p className="text-slate-600 text-[10px] line-clamp-1">
                        🎯 Advised: <strong className="text-slate-800">{teach.advisedSigs}</strong>
                      </p>
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>📍 {teach.cabin}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'authority' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Central Authority & Deanery Account
              </h4>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-800 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base">
                    🏛️
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Dr. M. Palaninatha Raja</h5>
                    <p className="text-xs text-slate-500">Dean (Academic Process) & Central SIG Director</p>
                    <span className="text-[10px] font-mono text-indigo-600">sig.coordinator@tce.edu</span>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickLogin('sig.coordinator@tce.edu')}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  <span>Login as Authority</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-white p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>TCE Institutional Security & Multi-Tenant Scoping</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
