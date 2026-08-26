import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Lock,
  Mail,
  Eye,
  EyeOff,
  KeyRound,
  Sparkles
} from 'lucide-react';
import { ForgotPasswordModal } from './ForgotPasswordModal';

interface MainPortalLandingProps {
  onOpenTceModal?: () => void;
}

export const MainPortalLanding: React.FC<MainPortalLandingProps> = () => {
  const { loginUser } = useAuth();

  // Active login portal: 'student' | 'teacher' (defaults to 'teacher')
  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>('teacher');

  // Input states
  const [email, setEmail] = useState('cdeisy@tce.edu');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  // Handle switching tabs
  const handleRoleChange = (role: 'student' | 'teacher') => {
    setActiveRole(role);
    setErrorMessage(null);
    if (role === 'student') {
      setEmail('vaidhavaroghini@student.tce.edu');
      setPassword('••••••••');
    } else {
      setEmail('cdeisy@tce.edu');
      setPassword('••••••••');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    // Reject student email on teacher portal
    if (activeRole === 'teacher' && cleanEmail.includes('student.tce.edu')) {
      setErrorMessage('Access Denied: @student.tce.edu email addresses belong to students. Please switch to the "Student Login" tab.');
      return;
    }

    // Reject teacher email on student portal
    if (activeRole === 'student' && !cleanEmail.includes('student.tce.edu') && cleanEmail.endsWith('@tce.edu')) {
      setErrorMessage('Access Denied: Faculty @tce.edu emails must use the "Teacher Login" tab.');
      return;
    }

    setIsSubmitting(true);

    try {
      await loginUser(email.trim(), password, activeRole);
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 font-sans">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
            T
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-none">
              Thiagarajar College of Engineering
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Autonomous Institution • TCE SIGConnect Portal
            </p>
          </div>
        </div>
      </div>

      {/* Center Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto py-8">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Top Role Selector Tabs */}
          <div className="p-2 bg-slate-100/80 border-b border-slate-200 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
                activeRole === 'student'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Login</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('teacher')}
              className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
                activeRole === 'teacher'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Teacher Login</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            
            <div className="mb-6">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                activeRole === 'student' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
              }`}>
                {activeRole === 'student' ? 'Student Gateway' : 'Faculty Advisor Gateway'}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {activeRole === 'student' ? 'Sign In to Your Student Account' : 'Sign In to Faculty Advisor Portal'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {activeRole === 'student'
                  ? 'Access your enrolled SIGs, project tasks, and lab announcements.'
                  : 'Manage advised student groups, schedules, and broadcasts.'}
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {activeRole === 'student' ? 'TCE Student Email / Roll No.' : 'Faculty Institutional Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={activeRole === 'student' ? 'yourname@student.tce.edu' : 'faculty@tce.edu'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center space-x-1"
                  >
                    <KeyRound className="w-3 h-3" />
                    <span>Forgot Password?</span>
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                    activeRole === 'student'
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-emerald-700 hover:bg-emerald-800'
                  }`}
                >
                  <span>{isSubmitting ? 'Signing in...' : `Enter ${activeRole === 'student' ? 'Student' : 'Teacher'} Portal`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>First time logging in? Enter your TCE email to set up your password.</span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400">
                Official TCE Academic System • Secured Institutional Access
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        initialEmail={email}
        onSuccess={() => {
          setPassword('');
        }}
      />

      {/* Simple Footer */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-slate-400 py-4">
        © 2026 Thiagarajar College of Engineering, Madurai • Autonomous Institution
      </div>

    </div>
  );
};
