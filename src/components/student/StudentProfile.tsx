import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import {
  User,
  GraduationCap,
  Mail,
  Shield,
  Layers,
  Sparkles,
  Tag,
  CheckCircle2,
  Award,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ForgotPasswordModal } from '../auth/ForgotPasswordModal';

export const StudentProfile: React.FC = () => {
  const { user, joinedSigs, allSigs, refreshUserData, showToast, changePassword } = useAuth();
  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleAddInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInterest.trim() || !user) return;
    try {
      setIsSaving(true);
      const updatedInterests = [...user.interests, newInterest.trim()];
      await api.updateProfile({ interests: updatedInterests });
      await refreshUserData();
      setNewInterest('');
      showToast('Added interest successfully', 'success');
    } catch (err: any) {
      showToast('Could not update interest', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || !user) return;
    try {
      setIsSaving(true);
      const updatedSkills = [...user.skills, newSkill.trim()];
      await api.updateProfile({ skills: updatedSkills });
      await refreshUserData();
      setNewSkill('');
      showToast('Added skill successfully', 'success');
    } catch (err: any) {
      showToast('Could not update skill', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation password do not match.');
      return;
    }

    try {
      setIsChangingPassword(true);
      await changePassword(currentPassword, newPassword.trim());
      setPasswordSuccess('Your account password was updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password. Please check your current password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div id="student-profile-view" className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'}
            alt={user?.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-rose-900/20 shadow-md"
          />
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-900">
                TCE Undergraduate
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Roll No: {user?.rollNo || '23CS105'}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900">{user?.name}</h1>
            <p className="text-xs text-stone-600 font-medium">
              {user?.department} • {user?.year} • Thiagarajar College of Engineering
            </p>
            <p className="text-xs text-stone-500 font-mono">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Enrolled SIGs */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-rose-900" />
            <h3 className="text-base font-bold text-stone-900">Enrolled Special Interest Groups</h3>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-900">
            {joinedSigs.length} Groups
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {joinedSigs.map((js) => (
            <div
              key={js.sig_id}
              className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{js.logo || '🚀'}</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{js.sig_name}</h4>
                  <span className="text-[10px] uppercase font-semibold text-stone-500">
                    Role: <strong className="text-rose-900">{js.role}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests & Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Interests */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-stone-900">Research & Tech Interests</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {user?.interests.map((interest, i) => (
              <span key={i} className="px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                {interest}
              </span>
            ))}
          </div>

          <form onSubmit={handleAddInterest} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add interest (e.g. LLMs)..."
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-rose-900"
            />
            <button
              type="submit"
              disabled={isSaving || !newInterest.trim()}
              className="px-3 py-1.5 rounded-xl bg-rose-900 text-white text-xs font-bold disabled:opacity-50"
            >
              Add
            </button>
          </form>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-rose-700" />
            <h3 className="text-sm font-bold text-stone-900">Verified Technical Skills</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {user?.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 rounded-xl bg-rose-50 text-rose-900 border border-rose-200 text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>

          <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add skill (e.g. Docker)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-rose-900"
            />
            <button
              type="submit"
              disabled={isSaving || !newSkill.trim()}
              className="px-3 py-1.5 rounded-xl bg-rose-900 text-white text-xs font-bold disabled:opacity-50"
            >
              Add
            </button>
          </form>
        </div>

      </div>

      {/* Security & Password Management */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-900 flex items-center justify-center font-bold">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Security & Password Management</h3>
              <p className="text-xs text-stone-500">Manage your TCE institutional authentication credentials</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Password Configured</span>
            </span>
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-xs font-semibold text-rose-900 hover:text-rose-700 underline underline-offset-2 ml-2"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {passwordError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="Current password"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-rose-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Min 4 chars"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-rose-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Confirm New
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-rose-900"
                />
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-stone-500 hover:text-stone-700 flex items-center space-x-1 font-medium"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPassword ? 'Hide password chars' : 'Show password chars'}</span>
            </button>

            <button
              type="submit"
              disabled={isChangingPassword || !newPassword || !confirmPassword}
              className="py-2 px-5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <span>{isChangingPassword ? 'Saving...' : 'Update Password'}</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        initialEmail={user?.email || ''}
      />

    </div>
  );
};
