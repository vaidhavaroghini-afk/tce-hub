import { User, SIG, Activity, Task, Notification, SIGResource, LeaderboardEntry, StudentJourneySummary } from '../types';

let currentAuthToken = 'user-student-d'; // Default demo token (Vaidha Varoghini)

export const setAuthToken = (token: string) => {
  currentAuthToken = token;
  localStorage.setItem('tce_sig_token', token);
};

export const getAuthToken = (): string => {
  const stored = localStorage.getItem('tce_sig_token');
  if (stored) {
    currentAuthToken = stored;
  }
  return currentAuthToken;
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  };

  const response = await fetch(url, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}: Request failed`);
  }

  return data;
};

export const api = {
  // Auth
  getDemoUsers: () => fetchWithAuth('/api/auth/demo-users'),
  login: (credentials: { email: string; password?: string; otp?: string; expectedRole?: 'student' | 'teacher' | 'authority' }) =>
    fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
  getMe: () => fetchWithAuth('/api/auth/me'),
  setInitialPassword: (data: { email?: string; userId?: string; newPassword: string }) =>
    fetchWithAuth('/api/auth/set-initial-password', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  forgotPassword: (email: string) =>
    fetchWithAuth('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    }),
  resetPassword: (data: { email: string; otp: string; newPassword: string }) =>
    fetchWithAuth('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  changePassword: (data: { currentPassword?: string; newPassword: string }) =>
    fetchWithAuth('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // SIG Discovery
  getSigs: (params?: { category?: string; department?: string; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.department) query.append('department', params.department);
    if (params?.search) query.append('search', params.search);
    return fetchWithAuth(`/api/sigs?${query.toString()}`);
  },
  getSigPublicProfile: (sigId: string) => fetchWithAuth(`/api/sigs/${sigId}/public-profile`),

  // Student Membership
  getMySigs: () => fetchWithAuth('/api/student/my-sigs'),
  joinSig: (sigId: string) => fetchWithAuth(`/api/sigs/${sigId}/join`, { method: 'POST' }),
  leaveSig: (sigId: string) => fetchWithAuth(`/api/sigs/${sigId}/leave`, { method: 'POST' }),

  // Tenant Scoped Workspace
  getTenantInfo: (sigId: string) => fetchWithAuth(`/api/sigs/${sigId}/tenant-info`),
  getActivities: (sigId: string) => fetchWithAuth(`/api/sigs/${sigId}/activities`),
  createActivity: (sigId: string, activity: Partial<Activity>) =>
    fetchWithAuth(`/api/sigs/${sigId}/activities`, {
      method: 'POST',
      body: JSON.stringify(activity)
    }),
  deleteActivity: (sigId: string, activityId: string) =>
    fetchWithAuth(`/api/sigs/${sigId}/activities/${activityId}`, { method: 'DELETE' }),
  registerForActivity: (sigId: string, activityId: string) =>
    fetchWithAuth(`/api/sigs/${sigId}/activities/${activityId}/register`, { method: 'POST' }),

  getTasks: (sigId: string) => fetchWithAuth(`/api/sigs/${sigId}/tasks`),
  createTask: (sigId: string, task: Partial<Task>) =>
    fetchWithAuth(`/api/sigs/${sigId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(task)
    }),
  updateTaskStatus: (sigId: string, taskId: string, status: Task['status'], progressPercent: number) =>
    fetchWithAuth(`/api/sigs/${sigId}/tasks/${taskId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, progressPercent })
    }),
  deleteTask: (sigId: string, taskId: string) =>
    fetchWithAuth(`/api/sigs/${sigId}/tasks/${taskId}`, { method: 'DELETE' }),

  getMembers: (sigId: string) => fetchWithAuth(`/api/sigs/${sigId}/members`),
  updateMemberRole: (sigId: string, targetUserId: string, role: string) =>
    fetchWithAuth(`/api/sigs/${sigId}/members/${targetUserId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role })
    }),
  removeMember: (sigId: string, targetUserId: string) =>
    fetchWithAuth(`/api/sigs/${sigId}/members/${targetUserId}`, { method: 'DELETE' }),

  getResources: (sigId: string) => fetchWithAuth(`/api/sigs/${sigId}/resources`),
  addResource: (sigId: string, resource: Partial<SIGResource>) =>
    fetchWithAuth(`/api/sigs/${sigId}/resources`, {
      method: 'POST',
      body: JSON.stringify(resource)
    }),

  getLeaderboard: (sigId: string) => fetchWithAuth(`/api/sigs/${sigId}/leaderboard`),

  // Notifications
  getStudentNotifications: () => fetchWithAuth('/api/student/notifications'),
  markNotificationRead: (notifId: string) =>
    fetchWithAuth(`/api/student/notifications/${notifId}/read`, { method: 'POST' }),
  markAllNotificationsRead: () =>
    fetchWithAuth('/api/student/notifications/read-all', { method: 'POST' }),

  // Journey & Recommendations
  getStudentJourney: () => fetchWithAuth('/api/student/journey'),
  getRecommendations: () => fetchWithAuth('/api/student/recommendations'),
  updateProfile: (profile: Partial<User>) =>
    fetchWithAuth('/api/student/profile', {
      method: 'PUT',
      body: JSON.stringify(profile)
    }),

  // Authority
  getAuthorityStats: () => fetchWithAuth('/api/authority/stats'),
  getAuthoritySigs: () => fetchWithAuth('/api/authority/sigs'),
  createSig: (sigData: Partial<SIG>) =>
    fetchWithAuth('/api/authority/sigs', {
      method: 'POST',
      body: JSON.stringify(sigData)
    }),
  updateSig: (sigId: string, sigData: Partial<SIG>) =>
    fetchWithAuth(`/api/authority/sigs/${sigId}`, {
      method: 'PUT',
      body: JSON.stringify(sigData)
    }),
  deleteSig: (sigId: string) =>
    fetchWithAuth(`/api/authority/sigs/${sigId}`, {
      method: 'DELETE'
    }),
  broadcastNotification: (payload: { targetSigIds?: string[]; sigId?: string; title: string; message: string; priority: string; category?: string }) =>
    fetchWithAuth('/api/authority/broadcast', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  // Teacher / Faculty Advisor Portal
  getTeacherSigs: () => fetchWithAuth('/api/teacher/my-sigs'),
  getSigRoster: (sigId: string) => fetchWithAuth(`/api/teacher/sigs/${sigId}/roster`),
  broadcastTeacherNotification: (sigId: string, payload: {
    title: string;
    message: string;
    priority?: string;
    category?: string;
    eventDate?: string;
    eventTime?: string;
    eventVenue?: string;
    meetingLink?: string;
    isClassroomActivity?: boolean;
  }) =>
    fetchWithAuth(`/api/teacher/sigs/${sigId}/broadcast`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  // Live Security Verification
  runSecurityTests: () => fetchWithAuth('/api/security/run-tests', { method: 'POST' }),
  resetDemoData: () => fetchWithAuth('/api/admin/reset-demo-data', { method: 'POST' })
};
