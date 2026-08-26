import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SIG } from '../types';
import { api, setAuthToken, getAuthToken } from '../lib/api';

interface JoinedSigInfo {
  sig_id: string;
  sig_name: string;
  shortName?: string;
  role: 'member' | 'sig_admin' | 'sig_owner';
  logo?: string;
}

interface AuthContextType {
  user: User | null;
  joinedSigs: JoinedSigInfo[];
  activeSigId: string | null;
  activeSig: SIG | null;
  allSigs: SIG[];
  isLoading: boolean;
  unreadNotifsCount: number;
  requiresPasswordSetup: boolean;
  setRequiresPasswordSetup: (val: boolean) => void;
  setActiveSigId: (sigId: string) => void;
  loginUser: (email: string, password?: string, expectedRole?: 'student' | 'teacher' | 'authority') => Promise<{ requiresPasswordSetup?: boolean }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  setInitialPassword: (newPassword: string) => Promise<void>;
  logout: () => void;
  switchUser: (userId: string) => Promise<void>;
  refreshUserData: () => Promise<void>;
  refreshTenantData: () => Promise<void>;
  toastMessage: { type: 'success' | 'error' | 'info'; message: string } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [joinedSigs, setJoinedSigs] = useState<JoinedSigInfo[]>([]);
  const [activeSigId, setActiveSigIdState] = useState<string | null>(null);
  const [activeSig, setActiveSig] = useState<SIG | null>(null);
  const [allSigs, setAllSigs] = useState<SIG[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState<number>(0);
  const [requiresPasswordSetup, setRequiresPasswordSetup] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      // Fetch all public SIGs for global catalog
      const sigsRes = await api.getSigs();
      setAllSigs(sigsRes.sigs || []);

      // Fetch user profile
      const meRes = await api.getMe();
      if (meRes && meRes.user) {
        setUser(meRes.user);
        const userJoined = meRes.user.joinedSigs || [];
        setJoinedSigs(userJoined);

        // Fetch notifications count
        try {
          const notifsRes = await api.getStudentNotifications();
          setUnreadNotifsCount(notifsRes.unreadCount || 0);
        } catch {
          // Ignore
        }

        // Set or validate active SIG context
        if (userJoined.length > 0) {
          // If previous activeSigId is still in joinedSigs, retain it; otherwise select first
          const currentId = activeSigId;
          const stillValid = currentId && userJoined.some((s: JoinedSigInfo) => s.sig_id === currentId);
          const nextSigId = stillValid ? currentId : userJoined[0].sig_id;
          setActiveSigIdState(nextSigId);

          const fullSig = (sigsRes.sigs || []).find((s: SIG) => s.id === nextSigId);
          setActiveSig(fullSig || null);
        } else {
          setActiveSigIdState(null);
          setActiveSig(null);
        }
      }
    } catch (err: any) {
      console.warn('Auth load error, fallback to demo initial user', err);
      // Try logging in with demo user Student D
      setAuthToken('user-student-d');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setAuthToken('user-student-d');
    }
    loadUserData();
  }, []);

  const setActiveSigId = (sigId: string) => {
    // Validate that user is either authority or a member of this SIG
    if (user?.role !== 'authority') {
      const isMember = joinedSigs.some(s => s.sig_id === sigId);
      if (!isMember) {
        showToast(`Tenant Isolation: You must join this SIG before setting it as Active Context.`, 'error');
        return;
      }
    }

    setActiveSigIdState(sigId);
    const fullSig = allSigs.find(s => s.id === sigId);
    setActiveSig(fullSig || null);
    showToast(`Active SIG Context switched to: ${fullSig?.name || sigId}`, 'success');
  };

  const loginUser = async (email: string, password?: string, expectedRole?: 'student' | 'teacher' | 'authority') => {
    try {
      setIsLoading(true);
      const res = await api.login({ email, password, expectedRole });
      setAuthToken(res.token);
      await loadUserData();

      if (res.requiresPasswordSetup) {
        setRequiresPasswordSetup(true);
        showToast('First-time login detected: Please set a secure password for your account.', 'info');
      } else {
        showToast(`Welcome, ${res.user.name}! (${res.user.role === 'teacher' ? 'Faculty Advisor' : res.user.role === 'authority' ? 'Central Deanery' : 'Student'})`, 'success');
      }
      return { requiresPasswordSetup: !!res.requiresPasswordSetup };
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const res = await api.changePassword({ currentPassword, newPassword });
      showToast(res.message || 'Password changed successfully', 'success');
      if (user) {
        setUser({ ...user, hasSetPassword: true });
      }
    } catch (err: any) {
      showToast(err.message || 'Could not change password', 'error');
      throw err;
    }
  };

  const setInitialPassword = async (newPassword: string) => {
    try {
      if (!user) throw new Error('User not loaded');
      const res = await api.setInitialPassword({ userId: user.id, email: user.email, newPassword });
      setRequiresPasswordSetup(false);
      setUser({ ...user, hasSetPassword: true });
      showToast(res.message || 'Password configured successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Could not set initial password', 'error');
      throw err;
    }
  };

  const switchUser = async (userId: string) => {
    try {
      setIsLoading(true);
      setAuthToken(userId);
      await loadUserData();
      showToast(`Switched active profile session to ${userId}`, 'info');
    } catch (err: any) {
      showToast(err.message || 'Switch user failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setJoinedSigs([]);
    setActiveSigIdState(null);
    setActiveSig(null);
    setRequiresPasswordSetup(false);
    setAuthToken('');
    localStorage.removeItem('tce_sig_token');
    showToast('Logged out of TCE SIGConnect', 'info');
  };

  const refreshUserData = async () => {
    await loadUserData();
  };

  const refreshTenantData = async () => {
    if (activeSigId) {
      try {
        const notifsRes = await api.getStudentNotifications();
        setUnreadNotifsCount(notifsRes.unreadCount || 0);
      } catch {
        // Ignore
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        joinedSigs,
        activeSigId,
        activeSig,
        allSigs,
        isLoading,
        unreadNotifsCount,
        requiresPasswordSetup,
        setRequiresPasswordSetup,
        setActiveSigId,
        loginUser,
        changePassword,
        setInitialPassword,
        logout,
        switchUser,
        refreshUserData,
        refreshTenantData,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
