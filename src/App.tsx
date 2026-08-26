import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LeftSidebar } from './components/navigation/LeftSidebar';
import { MainPortalLanding } from './components/auth/MainPortalLanding';
import { TceOfficialExplorerModal } from './components/TceOfficialExplorerModal';
import { FirstTimePasswordModal } from './components/auth/FirstTimePasswordModal';
import { ChangePasswordModal } from './components/auth/ChangePasswordModal';

// Student Components
import { StudentHome } from './components/student/StudentHome';
import { ExploreSigs } from './components/student/ExploreSigs';
import { ActiveSigWorkspace } from './components/student/ActiveSigWorkspace';
import { EventsCalendar } from './components/student/EventsCalendar';
import { NotificationCenter } from './components/student/NotificationCenter';
import { GamificationJourney } from './components/student/GamificationJourney';
import { StudentProfile } from './components/student/StudentProfile';

// Teacher / Faculty Advisor Components
import { TeacherDashboard } from './components/teacher/TeacherDashboard';

// Authority Components
import { AuthorityDashboard } from './components/authority/AuthorityDashboard';
import { SigManagement } from './components/authority/SigManagement';
import { TargetedBroadcast } from './components/authority/TargetedBroadcast';

import {
  CheckCircle2,
  AlertCircle,
  Info,
  Loader2,
  Globe,
  LogOut
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { user, isLoading, toastMessage, allSigs, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isTceModalOpen, setIsTceModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [initialSelectedSigId, setInitialSelectedSigId] = useState<string | null>(null);

  // Synchronize current tab when role switches
  useEffect(() => {
    if (user?.role === 'authority') {
      if (['home', 'explore', 'workspace', 'calendar', 'journey', 'notifications', 'profile', 'teacher-dashboard'].includes(currentTab)) {
        setCurrentTab('authority-dashboard');
      }
    } else if (user?.role === 'teacher') {
      if (['home', 'explore', 'workspace', 'calendar', 'journey', 'notifications', 'profile', 'authority-dashboard', 'authority-sigs', 'authority-broadcast'].includes(currentTab)) {
        setCurrentTab('teacher-dashboard');
      }
    } else {
      // Student
      if (['authority-dashboard', 'authority-sigs', 'authority-broadcast', 'teacher-dashboard'].includes(currentTab)) {
        setCurrentTab('home');
      }
    }
  }, [user?.role]);

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4 p-4 font-sans text-slate-900">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg animate-bounce">
          T
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-base font-bold text-slate-900">Thiagarajar College of Engineering</h2>
          <p className="text-xs text-slate-500">Initializing TCE SIGConnect Portal...</p>
        </div>
        <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`flex items-center space-x-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold max-w-sm ${
              toastMessage.type === 'success'
                ? 'bg-slate-900 text-emerald-300 border-slate-700 shadow-slate-900/30'
                : toastMessage.type === 'error'
                ? 'bg-slate-900 text-rose-300 border-slate-700 shadow-slate-900/30'
                : 'bg-slate-900 text-indigo-200 border-slate-700 shadow-slate-900/30'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* If NOT LOGGED IN: Dedicated Main Landing Page with Direct Student vs Teacher Login */}
      {!user ? (
        <MainPortalLanding
          onOpenTceModal={() => setIsTceModalOpen(true)}
        />
      ) : (
        /* If LOGGED IN: Left-Aligned Menu & Navigation Layout */
        <div className="flex min-h-screen">
          
          {/* Left-Aligned Sidebar & Mobile Drawer Menu */}
          <LeftSidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onOpenSecurityModal={() => {}}
            onOpenTceModal={() => setIsTceModalOpen(true)}
          />

          {/* Main Workspace / Content Area (Padded on left for desktop sidebar) */}
          <div className="flex-1 flex flex-col md:pl-64 lg:pl-72 min-w-0">
            
            {/* Desktop Top Status Strip (Clean, Left-aligned, Uncluttered) */}
            <div className="hidden md:flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200/80 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-slate-800">Thiagarajar College of Engineering, Madurai</span>
                <span>•</span>
                <span className="text-slate-500">Autonomous Institution (NAAC A+)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <span className="font-medium">{user.role === 'teacher' ? 'Faculty Advisor' : user.role === 'authority' ? 'Central Deanery' : 'Student'}</span>
                <span>•</span>
                <span className="text-slate-800 font-semibold">{user.name}</span>
              </div>
            </div>

            {/* Main Tab Views */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
              
              {/* 1. STUDENT VIEWS */}
              {user.role !== 'authority' && user.role !== 'teacher' && (
                <>
                  {currentTab === 'home' && (
                    <StudentHome
                      onNavigate={setCurrentTab}
                      onSelectSig={(sigId) => {
                        setInitialSelectedSigId(sigId);
                        setCurrentTab('explore');
                      }}
                    />
                  )}

                  {currentTab === 'explore' && (
                    <ExploreSigs
                      initialSelectedSigId={initialSelectedSigId}
                      onOpenWorkspace={(sigId) => {
                        setCurrentTab('workspace');
                      }}
                    />
                  )}

                  {currentTab === 'workspace' && (
                    <ActiveSigWorkspace onNavigate={setCurrentTab} />
                  )}

                  {currentTab === 'calendar' && <EventsCalendar />}

                  {currentTab === 'journey' && <GamificationJourney />}

                  {currentTab === 'notifications' && <NotificationCenter />}

                  {currentTab === 'profile' && <StudentProfile />}
                </>
              )}

              {/* 2. TEACHER / FACULTY ADVISOR VIEWS */}
              {user.role === 'teacher' && (
                <>
                  {currentTab === 'teacher-dashboard' && <TeacherDashboard />}
                </>
              )}

              {/* 3. AUTHORITY VIEWS */}
              {user.role === 'authority' && (
                <>
                  {currentTab === 'authority-dashboard' && (
                    <AuthorityDashboard
                      onNavigate={setCurrentTab}
                      onOpenSecurityModal={() => {}}
                    />
                  )}

                  {currentTab === 'authority-sigs' && <SigManagement />}

                  {currentTab === 'authority-broadcast' && <TargetedBroadcast />}
                </>
              )}
            </main>

            {/* Clean Footer */}
            <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-indigo-600 rounded text-white font-bold flex items-center justify-center text-[9px]">T</div>
                  <span className="font-bold text-slate-800">TCE SIGConnect</span>
                  <span>•</span>
                  <span>Thiagarajar College of Engineering, Madurai</span>
                </div>
                <div className="flex items-center space-x-3 text-[11px]">
                  <span>NAAC A+ Autonomous Institution</span>
                </div>
              </div>
            </footer>

          </div>
        </div>
      )}

      {/* TCE Official Website Directory Explorer Modal */}
      <TceOfficialExplorerModal
        isOpen={isTceModalOpen}
        onClose={() => setIsTceModalOpen(false)}
        sigs={allSigs}
        onSelectSig={(sigId) => {
          setInitialSelectedSigId(sigId);
          if (user?.role !== 'authority' && user?.role !== 'teacher') {
            setCurrentTab('explore');
          }
        }}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
