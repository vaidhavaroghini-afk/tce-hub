import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Compass,
  Layers,
  Calendar,
  Award,
  Bell,
  User as UserIcon,
  BookOpen,
  Building,
  Shield,
  Globe,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface LeftSidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSecurityModal: () => void;
  onOpenTceModal: () => void;
  onOpenAuthModal?: () => void;
  onOpenChangePasswordModal?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSecurityModal,
  onOpenTceModal,
  onOpenAuthModal,
  onOpenChangePasswordModal
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigDropdownOpen, setIsSigDropdownOpen] = useState(false);

  const isAuthority = user?.role === 'authority';
  const isTeacher = user?.role === 'teacher';
  const isStudent = !isAuthority && !isTeacher;

  const handleNavClick = (tabKey: string) => {
    setCurrentTab(tabKey);
    setIsMobileMenuOpen(false);
  };

  interface NavItem {
    key: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }

  // Student Navigation Items
  const studentNavItems: NavItem[] = [
    { key: 'home', label: 'My Enrolled SIGs', icon: Home, badge: `${joinedSigs.length} joined` },
    { key: 'explore', label: 'Explore & Join SIGs', icon: Compass, badge: `${allSigs.length} available` },
    { key: 'workspace', label: 'Active SIG Workspace', icon: Layers, badge: activeSig ? (activeSig.shortName || activeSig.name.slice(0, 10)) : undefined },
    { key: 'calendar', label: 'Events & Lab Calendar', icon: Calendar },
    { key: 'journey', label: 'My Progress & Badges', icon: Award, badge: `${user?.points || 0} pts` },
    { key: 'notifications', label: 'Notification Center', icon: Bell, badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : undefined, badgeColor: 'bg-rose-500 text-white' },
    { key: 'profile', label: 'Student Profile', icon: UserIcon },
  ];

  // Teacher / Faculty Advisor Navigation Items
  const teacherNavItems: NavItem[] = [
    { key: 'teacher-dashboard', label: 'Faculty Advisor Portal', icon: BookOpen },
  ];

  // Authority Navigation Items
  const authorityNavItems: NavItem[] = [
    { key: 'authority-dashboard', label: 'Deanery Overview', icon: Building },
    { key: 'authority-sigs', label: 'SIG Catalog & Approval', icon: Layers },
    { key: 'authority-broadcast', label: 'Targeted Broadcast', icon: Bell },
  ];

  const activeNavItems = isAuthority
    ? authorityNavItems
    : isTeacher
    ? teacherNavItems
    : studentNavItems;

  const currentTabLabel = activeNavItems.find(item => item.key === currentTab)?.label || 'Dashboard';

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 border-r border-slate-800">
      
      {/* 1. Brand & College Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
            T
          </div>
          <div className="truncate">
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>TCE SIGConnect</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium truncate">
              Thiagarajar College of Engineering
            </p>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Autonomous Institution
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Madurai</span>
        </div>
      </div>

      {/* 2. User Identity Card & Role Banner */}
      <div className="p-3.5 mx-3 mt-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-inner">
            {user?.name?.slice(0, 2).toUpperCase() || 'TC'}
          </div>
          <div className="truncate flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate block">
                {user?.name || 'TCE User'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              {user?.department || 'TCE Department'}
            </p>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between">
          <span
            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
              isAuthority
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : isTeacher
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
            }`}
          >
            {isAuthority ? 'Central Deanery' : isTeacher ? 'Faculty Advisor' : 'Student Portal'}
          </span>
          <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Online</span>
          </span>
        </div>
      </div>

      {/* 3. Active SIG Context Selector (For Students) */}
      {isStudent && (
        <div className="px-3 pt-3">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
            Active SIG Workspace Context
          </label>
          
          <div className="relative">
            <button
              onClick={() => setIsSigDropdownOpen(!isSigDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-800/90 border border-slate-700 text-left hover:border-slate-600 transition-all text-xs"
            >
              <div className="flex items-center space-x-2 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
                <span className="font-bold text-white truncate">
                  {activeSig ? activeSig.name : 'Select Active SIG'}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isSigDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSigDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 p-1.5 max-h-56 overflow-y-auto">
                {joinedSigs.length === 0 ? (
                  <div className="p-2 text-[11px] text-slate-400 text-center">
                    No SIGs joined yet. Explore the catalog to join!
                  </div>
                ) : (
                  joinedSigs.map((sig) => {
                    const isSelected = activeSigId === sig.sig_id;
                    return (
                      <button
                        key={sig.sig_id}
                        onClick={() => {
                          setActiveSigId(sig.sig_id);
                          setIsSigDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <span className="truncate pr-2">{sig.sig_name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Main Left-Aligned Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
          Navigation Menu
        </div>

        {activeNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.key;

          return (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                    item.badgeColor || (isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400 border border-slate-700')
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 5. Institutional Tools & Direct Access (Bottom Section) */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50 space-y-2">
        <button
          onClick={() => {
            onOpenTceModal();
            setIsMobileMenuOpen(false);
          }}
          className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-indigo-300 hover:bg-slate-800/80 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>TCE Directory</span>
          </div>
          <ArrowRight className="w-3 h-3 text-indigo-400" />
        </button>

        {onOpenChangePasswordModal && (
          <button
            onClick={() => {
              onOpenChangePasswordModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs font-bold text-slate-300 bg-slate-800/70 border border-slate-700/80 hover:bg-slate-700/80 hover:text-white transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Change Password</span>
          </button>
        )}

        <button
          onClick={() => {
            logout();
            setIsMobileMenuOpen(false);
          }}
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/30 border border-rose-800/40 hover:bg-rose-900/40 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-400" />
          <span>Sign Out</span>
        </button>

        <div className="pt-1 text-[10px] text-slate-500 text-center">
          TCE Madurai • Autonomous
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* MOBILE TOP BAR (Visible only on small screens) */}
      <div className="md:hidden sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-md">
        
        {/* Left Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 flex items-center space-x-2"
          aria-label="Open Left Navigation Menu"
        >
          <Menu className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-bold">Menu</span>
        </button>

        {/* Center Title */}
        <div className="text-center truncate px-2">
          <span className="text-xs font-bold block text-white truncate">
            {currentTabLabel}
          </span>
          <span className="text-[10px] text-slate-400 truncate block">
            {activeSig ? activeSig.name : (isTeacher ? 'Faculty Portal' : 'TCE SIGConnect')}
          </span>
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center space-x-2">
          {unreadNotifsCount > 0 && isStudent && (
            <button
              onClick={() => setCurrentTab('notifications')}
              className="relative p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
            </button>
          )}

          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
            {user?.name?.slice(0, 1) || 'T'}
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE-OVER DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs h-full bg-slate-900 shadow-2xl z-10 flex flex-col animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {renderSidebarContent()}
          </div>
        </div>
      )}

      {/* DESKTOP LEFT SIDEBAR (Fixed Left Dock) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col fixed inset-y-0 left-0 z-30 shadow-xl">
        {renderSidebarContent()}
      </aside>
    </>
  );
};
