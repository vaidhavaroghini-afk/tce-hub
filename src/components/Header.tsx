import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Bell,
  ChevronDown,
  Sparkles,
  Shield,
  Layers,
  GraduationCap,
  Calendar,
  Compass,
  Home,
  Award,
  User as UserIcon,
  LogOut,
  CheckCircle2,
  Lock,
  PlusCircle,
  ExternalLink,
  BookOpen,
  Globe,
  Users
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSecurityModal: () => void;
  onOpenAuthModal?: () => void;
  onOpenTceModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSecurityModal,
  onOpenAuthModal,
  onOpenTceModal
}) => {
  const {
    user,
    joinedSigs,
    activeSigId,
    activeSig,
    allSigs,
    setActiveSigId,
    unreadNotifsCount,
    logout
  } = useAuth();

  const [isSigDropdownOpen, setIsSigDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const isAuthority = user?.role === 'authority';
  const isTeacher = user?.role === 'teacher';
  const isStudent = !isAuthority && !isTeacher;

  return (
    <header id="tce-header" className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Campus Announcement / TCE Banner Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            TCE AUTONOMOUS
          </span>
          <span className="font-medium hidden sm:inline text-slate-200">Thiagarajar College of Engineering, Madurai</span>
          <span className="text-slate-500 hidden md:inline">• Special Interest Groups Directorate</span>
        </div>
        
        <div className="flex items-center space-x-3 text-[11px]">
          {onOpenTceModal && (
            <button
              onClick={onOpenTceModal}
              className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-indigo-900/60 text-indigo-200 hover:bg-indigo-800 border border-indigo-700 transition-colors"
            >
              <Globe className="w-3 h-3 text-indigo-400" />
              <span className="font-semibold">Official TCE Website SIGs</span>
            </button>
          )}

          <button
            onClick={onOpenSecurityModal}
            className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-slate-700 transition-colors"
            title="Inspect Multi-Tenant Security & Isolation Compliance"
          >
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="font-semibold hidden sm:inline">Security Inspector</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                if (isTeacher) setCurrentTab('teacher-dashboard');
                else if (isAuthority) setCurrentTab('authority-dashboard');
                else setCurrentTab('home');
              }}
              className="flex items-center space-x-3 text-left group"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
                <span>T</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-slate-900 tracking-tight">TCE SIGConnect</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    isAuthority
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : isTeacher
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  }`}>
                    {isAuthority ? 'Authority Admin' : isTeacher ? 'Teacher Portal' : 'Student Portal'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Thiagarajar College of Engineering</p>
              </div>
            </button>

            {/* Active SIG Selector Pill Dropdown (For Students) */}
            {isStudent && (
              <div className="relative ml-2 sm:ml-4 hidden md:block">
                <button
                  id="active-sig-selector-button"
                  onClick={() => setIsSigDropdownOpen(!isSigDropdownOpen)}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs cursor-pointer hover:bg-slate-50 transition-all text-slate-800 group"
                >
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Context:</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-800 truncate max-w-[180px] lg:max-w-[240px]">
                    {activeSig ? activeSig.name : 'Select Active SIG'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isSigDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isSigDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsSigDropdownOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-2 text-slate-800">
                      <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Joined SIGs</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                          {joinedSigs.length} Enrolled
                        </span>
                      </div>

                      <div className="max-h-60 overflow-y-auto py-1 space-y-1">
                        {joinedSigs.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-500">
                            You haven't joined any SIG yet. Explore and join any number of SIGs!
                          </div>
                        ) : (
                          joinedSigs.map((js) => {
                            const isSelected = js.sig_id === activeSigId;
                            return (
                              <button
                                key={js.sig_id}
                                onClick={() => {
                                  setActiveSigId(js.sig_id);
                                  setIsSigDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                                  isSelected
                                    ? 'bg-indigo-50/80 border border-indigo-200 text-indigo-950 font-semibold'
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center space-x-2.5 truncate">
                                  <span className="text-lg">{js.logo || '🚀'}</span>
                                  <div className="truncate">
                                    <p className="text-xs font-bold truncate">{js.sig_name}</p>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                                      Role: <strong className="text-indigo-600">{js.role}</strong>
                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <span className="text-xs font-bold text-indigo-600 flex items-center space-x-1 shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                                    <span>Active</span>
                                  </span>
                                )}
                              </button>
                            );
                          })
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-2 px-1">
                        <button
                          onClick={() => {
                            setCurrentTab('explore');
                            setIsSigDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Explore & Join More SIGs (No Limit)</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* STUDENT NAV */}
            {isStudent && (
              <>
                <button
                  id="nav-student-home"
                  onClick={() => setCurrentTab('home')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'home'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>My SIGs</span>
                </button>

                <button
                  id="nav-student-explore"
                  onClick={() => setCurrentTab('explore')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'explore'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Discover SIGs</span>
                </button>

                {activeSig && (
                  <button
                    id="nav-student-workspace"
                    onClick={() => setCurrentTab('workspace')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                      currentTab === 'workspace'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Workspace</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </button>
                )}

                <button
                  id="nav-student-calendar"
                  onClick={() => setCurrentTab('calendar')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'calendar'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Events</span>
                </button>

                <button
                  id="nav-student-journey"
                  onClick={() => setCurrentTab('journey')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'journey'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Journey</span>
                </button>
              </>
            )}

            {/* TEACHER NAV */}
            {isTeacher && (
              <>
                <button
                  id="nav-teacher-dashboard"
                  onClick={() => setCurrentTab('teacher-dashboard')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'teacher-dashboard'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Advised SIGs & Rosters</span>
                </button>

                {onOpenTceModal && (
                  <button
                    onClick={onOpenTceModal}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>TCE Department Directory</span>
                  </button>
                )}
              </>
            )}

            {/* AUTHORITY NAV */}
            {isAuthority && (
              <>
                <button
                  id="nav-auth-dashboard"
                  onClick={() => setCurrentTab('authority-dashboard')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'authority-dashboard'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Executive Overview</span>
                </button>
                <button
                  id="nav-auth-sigs"
                  onClick={() => setCurrentTab('authority-sigs')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'authority-sigs'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>SIG Governance</span>
                </button>
                <button
                  id="nav-auth-broadcast"
                  onClick={() => setCurrentTab('authority-broadcast')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'authority-broadcast'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Targeted Broadcast</span>
                </button>
              </>
            )}
          </nav>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Switch Role / Login Button */}
            {onOpenAuthModal && (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition-colors border border-slate-200"
                title="Switch between Student, Teacher, or Authority Login"
              >
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Switch Role</span>
              </button>
            )}

            {/* Notification Center Trigger */}
            {isStudent && (
              <button
                id="notifications-button"
                onClick={() => setCurrentTab('notifications')}
                className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                title="SIG Isolated Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white shadow-xs">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                id="user-profile-button"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors border border-slate-200 bg-white"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div className="text-left hidden sm:block pr-2">
                  <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[110px]">
                    {user?.name}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">
                    {user?.role === 'teacher' ? 'Faculty Advisor' : user?.role}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-3 text-slate-800">
                    <div className="pb-3 mb-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                      <p className="text-xs text-slate-500 font-mono">{user?.email}</p>
                      <p className="text-[11px] text-indigo-600 font-semibold mt-1">
                        {user?.department}
                      </p>
                      {user?.designation && (
                        <p className="text-[10px] text-slate-500">{user.designation}</p>
                      )}
                      {user?.rollNo && (
                        <p className="text-[10px] text-slate-400 font-mono">Roll: {user.rollNo}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      {isStudent && (
                        <>
                          <button
                            onClick={() => {
                              setCurrentTab('profile');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Student Profile</span>
                          </button>
                          <button
                            onClick={() => {
                              setCurrentTab('journey');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span>My Growth Journey</span>
                          </button>
                        </>
                      )}

                      {onOpenAuthModal && (
                        <button
                          onClick={() => {
                            onOpenAuthModal();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                        >
                          <Users className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Switch Role / Login</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onOpenSecurityModal();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
                      >
                        <Shield className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Security & Multi-Tenancy Tests</span>
                      </button>

                      <div className="border-t border-slate-100 my-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-500" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Active SIG bar when on mobile view (For Students) */}
      {isStudent && activeSig && (
        <div className="md:hidden bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 truncate">
            <span className="text-sm">{activeSig.logo}</span>
            <span className="font-bold text-slate-900 truncate">{activeSig.name}</span>
          </div>
          <button
            onClick={() => setIsSigDropdownOpen(true)}
            className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full"
          >
            Switch SIG
          </button>
        </div>
      )}

    </header>
  );
};
