import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Activity, Task, SIGResource, LeaderboardEntry, SIG } from '../../types';
import { api } from '../../lib/api';
import confetti from 'canvas-confetti';
import {
  Layers,
  Calendar,
  CheckSquare,
  FileText,
  Trophy,
  Users,
  PlusCircle,
  Clock,
  MapPin,
  Sparkles,
  Award,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  Lock,
  UserCheck,
  Shield,
  Upload,
  BarChart3
} from 'lucide-react';

interface ActiveSigWorkspaceProps {
  onNavigate: (tab: string) => void;
}

export const ActiveSigWorkspace: React.FC<ActiveSigWorkspaceProps> = ({ onNavigate }) => {
  const { user, activeSigId, activeSig, refreshUserData, showToast } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'activities' | 'tasks' | 'resources' | 'leaderboard' | 'members'>('overview');
  
  // Data states
  const [tenantInfo, setTenantInfo] = useState<any>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [resources, setResources] = useState<SIGResource[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Modals
  const [isCreateActivityOpen, setIsCreateActivityOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);

  // Form states
  const [activityForm, setActivityForm] = useState({
    title: '',
    description: '',
    category: 'workshop' as Activity['category'],
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    time: '4:45 PM - 6:30 PM',
    venue: 'TCE Seminar Lab',
    isOnline: false,
    maxParticipants: 45
  });

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    deadline: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    priority: 'medium' as Task['priority'],
    pointsReward: 50
  });

  const [resourceForm, setResourceForm] = useState({
    title: '',
    description: '',
    type: 'pdf' as SIGResource['type'],
    url: '',
    size: '3.2 MB'
  });

  // Fetch all tenant-scoped data
  const loadTenantData = async () => {
    if (!activeSigId) return;

    try {
      setIsLoading(true);
      setPermissionError(null);

      // Verify tenant membership & fetch isolated data
      const [infoRes, actsRes, tasksRes, resRes, leadRes, memsRes] = await Promise.all([
        api.getTenantInfo(activeSigId),
        api.getActivities(activeSigId),
        api.getTasks(activeSigId),
        api.getResources(activeSigId),
        api.getLeaderboard(activeSigId),
        api.getMembers(activeSigId)
      ]);

      setTenantInfo(infoRes.tenant);
      setActivities(actsRes.activities || []);
      setTasks(tasksRes.tasks || []);
      setResources(resRes.resources || []);
      setLeaderboard(leadRes.leaderboard || []);
      setMembers(memsRes.members || []);
    } catch (err: any) {
      console.error('Tenant load error', err);
      setPermissionError(err.message || 'Tenant access blocked: You are not authorized for this SIG.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTenantData();
  }, [activeSigId, user?.id]);

  const userRoleInSig = tenantInfo?.currentUserRoleInSig || 'member';
  const isSigAdminOrOwner = userRoleInSig === 'sig_admin' || userRoleInSig === 'sig_owner' || user?.role === 'authority';
  const isSigOwner = userRoleInSig === 'sig_owner' || user?.role === 'authority';

  // Actions
  const handleRegisterActivity = async (activityId: string) => {
    if (!activeSigId) return;
    try {
      const res = await api.registerForActivity(activeSigId, activityId);
      showToast(res.message, 'success');
      confetti({ particleCount: 50, spread: 50 });
      await loadTenantData();
      await refreshUserData();
    } catch (err: any) {
      showToast(err.message || 'Registration failed', 'error');
    }
  };

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSigId) return;
    try {
      const res = await api.createActivity(activeSigId, activityForm);
      showToast(res.message, 'success');
      setIsCreateActivityOpen(false);
      setActivityForm({
        title: '',
        description: '',
        category: 'workshop',
        date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        time: '4:45 PM - 6:30 PM',
        venue: 'TCE Seminar Lab',
        isOnline: false,
        maxParticipants: 45
      });
      await loadTenantData();
    } catch (err: any) {
      showToast(err.message || 'Failed to create activity', 'error');
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (!activeSigId || !confirm('Are you sure you want to delete this activity?')) return;
    try {
      const res = await api.deleteActivity(activeSigId, activityId);
      showToast(res.message, 'info');
      await loadTenantData();
    } catch (err: any) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSigId) return;
    try {
      const res = await api.createTask(activeSigId, {
        ...taskForm,
        assignedToUserIds: [user?.id || '']
      });
      showToast(res.message, 'success');
      setIsCreateTaskOpen(false);
      setTaskForm({
        title: '',
        description: '',
        deadline: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        priority: 'medium',
        pointsReward: 50
      });
      await loadTenantData();
    } catch (err: any) {
      showToast(err.message || 'Failed to create task', 'error');
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    if (!activeSigId) return;
    const progress = newStatus === 'completed' ? 100 : newStatus === 'in_progress' ? 50 : 0;
    try {
      const res = await api.updateTaskStatus(activeSigId, taskId, newStatus, progress);
      showToast(res.message, 'success');
      if (newStatus === 'completed') {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
      await loadTenantData();
      await refreshUserData();
    } catch (err: any) {
      showToast(err.message || 'Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!activeSigId || !confirm('Are you sure you want to delete this task?')) return;
    try {
      const res = await api.deleteTask(activeSigId, taskId);
      showToast(res.message, 'info');
      await loadTenantData();
    } catch (err: any) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSigId) return;
    try {
      const res = await api.addResource(activeSigId, resourceForm);
      showToast(res.message, 'success');
      setIsAddResourceOpen(false);
      setResourceForm({
        title: '',
        description: '',
        type: 'pdf',
        url: '',
        size: '3.2 MB'
      });
      await loadTenantData();
    } catch (err: any) {
      showToast(err.message || 'Failed to add resource', 'error');
    }
  };

  const handleUpdateMemberRole = async (targetUserId: string, newRole: string) => {
    if (!activeSigId) return;
    try {
      const res = await api.updateMemberRole(activeSigId, targetUserId, newRole);
      showToast(res.message, 'success');
      await loadTenantData();
    } catch (err: any) {
      showToast(err.message || 'Could not update role', 'error');
    }
  };

  const handleRemoveMember = async (targetUserId: string) => {
    if (!activeSigId || !confirm('Are you sure you want to remove this member from the SIG?')) return;
    try {
      const res = await api.removeMember(activeSigId, targetUserId);
      showToast(res.message, 'info');
      await loadTenantData();
      await refreshUserData();
    } catch (err: any) {
      showToast(err.message || 'Could not remove member', 'error');
    }
  };

  if (!activeSigId || !activeSig) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center bg-white space-y-4">
        <Layers className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">No Active SIG Context Selected</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Please select a joined SIG from the top navigation bar or browse available Special Interest Groups to join one.
        </p>
        <button
          onClick={() => onNavigate('explore')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
        >
          Explore SIGs Catalog
        </button>
      </div>
    );
  }

  if (permissionError) {
    return (
      <div className="rounded-2xl border border-rose-300 p-8 bg-rose-50/80 text-rose-900 space-y-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-rose-700 shrink-0" />
          <h3 className="text-base font-bold">403 Forbidden: Tenant Isolation Barrier</h3>
        </div>
        <p className="text-xs text-rose-800 leading-relaxed font-mono">
          {permissionError}
        </p>
        <p className="text-xs text-rose-700">
          The backend prevented access because your authenticated account is not an enrolled member of this Special Interest Group.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          Return to Safe Home Context
        </button>
      </div>
    );
  }

  return (
    <div id="active-sig-workspace" className="space-y-6 pb-16">
      
      {/* Workspace Header Banner - Bento Dark Style */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <span className="text-4xl p-3 rounded-2xl bg-slate-800 border border-slate-700 shadow-inner">
              {activeSig.logo || '🚀'}
            </span>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                  {activeSig.category}
                </span>
                <span className="text-xs text-slate-400">
                  • Tenant ID: <code className="font-mono text-emerald-400 font-bold">{activeSig.id}</code>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {activeSig.name}
              </h1>
              <p className="text-xs text-slate-300">
                Your Role: <strong className="text-white uppercase font-bold">{userRoleInSig}</strong>
                {isSigAdminOrOwner && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                    Admin Privileges Active
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Quick Tenant Metrics */}
          <div className="flex items-center space-x-2 text-center text-xs">
            <div className="bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Members</span>
              <span className="text-lg font-bold text-white font-mono">{tenantInfo?.metrics?.totalMembers || members.length}/50</span>
            </div>
            <div className="bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Activities</span>
              <span className="text-lg font-bold text-amber-300 font-mono">{activities.length}</span>
            </div>
            <div className="bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Active Tasks</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">{tasks.filter(t => t.status !== 'completed').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            activeSubTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveSubTab('activities')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            activeSubTab === 'activities'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Activities & Workshops ({activities.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tasks')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            activeSubTab === 'tasks'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Tasks ({tasks.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('resources')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            activeSubTab === 'resources'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Resource Hub ({resources.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('leaderboard')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            activeSubTab === 'leaderboard'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Leaderboard</span>
        </button>

        <button
          onClick={() => setActiveSubTab('members')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            activeSubTab === 'members'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Members ({members.length})</span>
        </button>
      </div>

      {/* SUB-TAB 1: OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-stone-900">About This Special Interest Group</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {activeSig.description}
                </p>

                {activeSig.objectives?.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Strategic Focus & Goals
                    </h4>
                    <ul className="space-y-1.5">
                      {activeSig.objectives.map((obj, i) => (
                        <li key={i} className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 flex items-start space-x-2">
                          <span className="text-rose-900 font-bold">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Technologies & Learnable Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-2">
                  <h4 className="text-xs font-bold text-stone-800 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Technologies Covered</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSig.technologies.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 border border-stone-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-2">
                  <h4 className="text-xs font-bold text-stone-800 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-rose-700" />
                    <span>Skills You Will Develop</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSig.skillsGained.map((sk, idx) => (
                      <span key={idx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-900 border border-rose-200">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Key Info & Contacts */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3.5">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100">
                  Meeting & Campus Info
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start space-x-2.5">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-semibold">Weekly Timings</span>
                      <span className="font-bold text-stone-800">{activeSig.meetingSchedule}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-semibold">Venue / Lab</span>
                      <span className="font-bold text-stone-800">{activeSig.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <UserCheck className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-semibold">Faculty Advisor</span>
                      <span className="font-bold text-stone-800">{activeSig.facultyAdvisor}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <Shield className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-semibold">SIG Lead / Coordinator</span>
                      <span className="font-bold text-stone-800">{activeSig.owner_name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2">
                <h4 className="text-xs font-bold text-stone-900">Workspace Shortcuts</h4>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setActiveSubTab('activities')}
                    className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-semibold hover:bg-rose-50 hover:text-rose-900 transition-colors"
                  >
                    View Activities
                  </button>
                  <button
                    onClick={() => setActiveSubTab('tasks')}
                    className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-semibold hover:bg-rose-50 hover:text-rose-900 transition-colors"
                  >
                    Manage Tasks
                  </button>
                  <button
                    onClick={() => setActiveSubTab('resources')}
                    className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-semibold hover:bg-rose-50 hover:text-rose-900 transition-colors"
                  >
                    Resource Hub
                  </button>
                  <button
                    onClick={() => setActiveSubTab('leaderboard')}
                    className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-semibold hover:bg-rose-50 hover:text-rose-900 transition-colors"
                  >
                    Leaderboard
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SUB-TAB 2: ACTIVITIES & WORKSHOPS */}
      {activeSubTab === 'activities' && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {activeSig.name} Activities & Events
              </h3>
              <p className="text-xs text-stone-500">
                Tenant-scoped technical workshops, CTFs, bootcamps, and coding hackathons
              </p>
            </div>

            {isSigAdminOrOwner && (
              <button
                onClick={() => setIsCreateActivityOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-900 text-white text-xs font-bold hover:bg-rose-950 transition-colors shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Activity</span>
              </button>
            )}
          </div>

          {activities.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center bg-stone-50">
              <Calendar className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-stone-800">No activities scheduled yet for this SIG</h4>
              <p className="text-xs text-stone-500 mt-1">Check back later or check with the SIG Coordinator.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activities.map((act) => {
                const isRegistered = act.registeredUserIds?.includes(user?.id || '');
                const isFull = (act.registeredCount || 0) >= act.maxParticipants;

                return (
                  <div
                    key={act.id}
                    className="rounded-2xl bg-white border border-stone-200 hover:border-stone-300 p-5 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-900">
                          {act.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          act.status === 'upcoming'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}>
                          {act.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-stone-900 leading-snug">
                        {act.title}
                      </h4>

                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                        {act.description}
                      </p>

                      <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span><strong>Date:</strong> {act.date} • {act.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span><strong>Venue:</strong> {act.venue} {act.isOnline && '(Online Hybrid)'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span><strong>Registered:</strong> {act.registeredCount || 0} / {act.maxParticipants} students</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      {isSigAdminOrOwner && (
                        <button
                          onClick={() => handleDeleteActivity(act.id)}
                          className="text-stone-400 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Activity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <div className="ml-auto">
                        {isRegistered ? (
                          <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>Registered</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleRegisterActivity(act.id)}
                            disabled={isFull || act.status !== 'upcoming'}
                            className="px-4 py-2 rounded-xl bg-rose-900 text-white text-xs font-bold hover:bg-rose-950 transition-colors shadow-xs disabled:opacity-50"
                          >
                            {isFull ? 'Seats Full' : 'Register (+20 pts)'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: TASKS */}
      {activeSubTab === 'tasks' && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {activeSig.name} Sprint Tasks
              </h3>
              <p className="text-xs text-stone-500">
                Collaborative technical tasks, assignments, and research milestones
              </p>
            </div>

            {isSigAdminOrOwner && (
              <button
                onClick={() => setIsCreateTaskOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-900 text-white text-xs font-bold hover:bg-rose-950 transition-colors shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Task</span>
              </button>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center bg-stone-50">
              <CheckSquare className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-stone-800">No active tasks in this SIG</h4>
              <p className="text-xs text-stone-500 mt-1">SIG Admins can create tasks for members to complete.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tasks.map((task) => {
                const isCompleted = task.status === 'completed';

                return (
                  <div
                    key={task.id}
                    className={`rounded-2xl bg-white border p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                      isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-stone-200'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          task.priority === 'urgent'
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : task.priority === 'high'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {task.priority} Priority
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          +{task.pointsReward || 50} pts
                        </span>
                      </div>

                      <h4 className={`text-sm font-bold text-stone-900 leading-snug ${isCompleted ? 'line-through text-stone-500' : ''}`}>
                        {task.title}
                      </h4>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {task.description}
                      </p>

                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-[11px] font-medium text-stone-500">
                          <span>Progress: {task.progressPercent}%</span>
                          <span>Due: <strong className="text-stone-800">{task.deadline}</strong></span>
                        </div>
                        <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${isCompleted ? 'bg-emerald-600' : 'bg-rose-900'}`}
                            style={{ width: `${task.progressPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      {task.assignedToNames && task.assignedToNames.length > 0 && (
                        <div className="text-[11px] text-stone-500">
                          Assigned to: <span className="font-semibold text-stone-700">{task.assignedToNames.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      {isSigAdminOrOwner && (
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-stone-400 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <div className="ml-auto flex items-center space-x-2">
                        {isCompleted ? (
                          <button
                            onClick={() => handleUpdateTaskStatus(task.id, 'in_progress')}
                            className="text-xs text-stone-500 hover:text-stone-800 underline"
                          >
                            Reopen
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center space-x-1 shadow-2xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Completed</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: RESOURCE HUB */}
      {activeSubTab === 'resources' && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {activeSig.name} Resource Library
              </h3>
              <p className="text-xs text-stone-500">
                Handbooks, cheatsheets, code repos, and video tutorials isolated to this SIG
              </p>
            </div>

            <button
              onClick={() => setIsAddResourceOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-900 text-white text-xs font-bold hover:bg-rose-950 transition-colors shadow-xs"
            >
              <Upload className="w-4 h-4" />
              <span>Share Resource</span>
            </button>
          </div>

          {resources.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center bg-stone-50">
              <FileText className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-stone-800">No resources uploaded yet</h4>
              <p className="text-xs text-stone-500 mt-1">Upload research documents, workshop notes, or code templates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((res) => (
                <div
                  key={res.id}
                  className="rounded-2xl bg-white border border-stone-200 hover:border-stone-300 p-5 shadow-xs flex items-start justify-between space-x-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {res.type}
                      </span>
                      {res.size && (
                        <span className="text-[10px] text-stone-400 font-mono">{res.size}</span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                      {res.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2">
                      {res.description}
                    </p>
                    <p className="text-[10px] text-stone-400 pt-1">
                      Uploaded by <strong className="text-stone-700">{res.uploaded_by}</strong> on {new Date(res.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-900 transition-colors shrink-0"
                    title="Access Resource"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 5: TENANT-SCOPED LEADERBOARD (Constraint 13) */}
      {activeSubTab === 'leaderboard' && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Trophy className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Isolated {activeSig.name} Leaderboard
                </h4>
                <p className="text-xs text-amber-900/80">
                  Scores calculated strictly from task completions and workshop attendance within this specific SIG.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-200/80 text-amber-950 px-2.5 py-1 rounded-full">
              Tenant Scoped
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4 text-center">Tasks Done</th>
                    <th className="py-3 px-4 text-center">Activities</th>
                    <th className="py-3 px-4 text-right">SIG Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {leaderboard.map((entry) => {
                    const isMe = entry.user_id === user?.id;
                    return (
                      <tr
                        key={entry.user_id}
                        className={`hover:bg-stone-50/80 transition-colors ${
                          isMe ? 'bg-rose-50/60 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            entry.rank === 1
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : entry.rank === 2
                              ? 'bg-stone-200 text-stone-800'
                              : entry.rank === 3
                              ? 'bg-amber-700/20 text-amber-900'
                              : 'text-stone-500'
                          }`}>
                            {entry.rank}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2.5">
                            <img
                              src={entry.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                              alt={entry.name}
                              className="w-7 h-7 rounded-lg object-cover"
                            />
                            <div>
                              <span className="font-bold text-stone-900">{entry.name}</span>
                              {isMe && (
                                <span className="ml-1.5 text-[9px] bg-rose-100 text-rose-900 font-bold px-1.5 py-0.2 rounded">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-stone-600">{entry.department}</td>
                        <td className="py-3 px-4 text-center font-mono">{entry.tasksCompleted}</td>
                        <td className="py-3 px-4 text-center font-mono">{entry.activitiesAttended}</td>
                        <td className="py-3 px-4 text-right font-bold text-rose-900 font-mono">
                          {entry.points} pts
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: MEMBERS DIRECTORY */}
      {activeSubTab === 'members' && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {activeSig.name} Enrolled Members
              </h3>
              <p className="text-xs text-stone-500">
                Current enrollment: <strong className="text-stone-800">{members.length}/50</strong> (Constraint 5 Maximum)
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Member</th>
                    <th className="py-3 px-4">Department & Year</th>
                    <th className="py-3 px-4">Roll No</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Joined Date</th>
                    {isSigOwner && <th className="py-3 px-4 text-right">Admin Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {members.map((mem) => {
                    const isMe = mem.user_id === user?.id;
                    return (
                      <tr key={mem.user_id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2.5">
                            <img
                              src={mem.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                              alt={mem.name}
                              className="w-7 h-7 rounded-lg object-cover"
                            />
                            <div>
                              <span className="font-bold text-stone-900">{mem.name}</span>
                              <p className="text-[10px] text-stone-500 font-mono">{mem.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          {mem.department} ({mem.year})
                        </td>
                        <td className="py-3 px-4 font-mono text-stone-600">{mem.rollNo || 'N/A'}</td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            mem.role === 'sig_owner'
                              ? 'bg-rose-100 text-rose-900 border border-rose-300'
                              : mem.role === 'sig_admin'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-stone-100 text-stone-700'
                          }`}>
                            {mem.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-500 text-[11px]">
                          {new Date(mem.joined_at).toLocaleDateString()}
                        </td>

                        {isSigOwner && (
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              {mem.role === 'member' && (
                                <button
                                  onClick={() => handleUpdateMemberRole(mem.user_id, 'sig_admin')}
                                  className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-[11px] font-semibold text-stone-800"
                                  title="Promote to Admin"
                                >
                                  Make Admin
                                </button>
                              )}
                              {mem.role === 'sig_admin' && (
                                <button
                                  onClick={() => handleUpdateMemberRole(mem.user_id, 'member')}
                                  className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-[11px] font-semibold text-stone-800"
                                  title="Demote to Member"
                                >
                                  Demote
                                </button>
                              )}
                              <button
                                onClick={() => handleRemoveMember(mem.user_id)}
                                className="p-1 rounded text-stone-400 hover:text-rose-700 hover:bg-rose-50"
                                title="Remove Member (Enforces Single Owner Guard)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CREATE ACTIVITY MODAL */}
      {isCreateActivityOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-sm font-bold text-stone-900">Create New {activeSig.name} Activity</h3>
              <button onClick={() => setIsCreateActivityOpen(false)} className="text-stone-400 hover:text-stone-700 text-sm">✕</button>
            </div>

            <form onSubmit={handleCreateActivity} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Activity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PyTorch Deep Learning Hands-on Workshop"
                  value={activityForm.title}
                  onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description & Prerequisites</label>
                <textarea
                  rows={3}
                  placeholder="Provide technical workshop summary and notebook requirements..."
                  value={activityForm.description}
                  onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={activityForm.category}
                    onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none bg-white"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="bootcamp">Bootcamp</option>
                    <option value="seminar">Seminar</option>
                    <option value="hands-on">Hands-on Lab</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={activityForm.date}
                    onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Timings</label>
                  <input
                    type="text"
                    value={activityForm.time}
                    onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Max Capacity</label>
                  <input
                    type="number"
                    max={50}
                    value={activityForm.maxParticipants}
                    onChange={(e) => setActivityForm({ ...activityForm, maxParticipants: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Venue / Online Link</label>
                <input
                  type="text"
                  placeholder="e.g. TCE Advanced AI Lab CSE-302"
                  value={activityForm.venue}
                  onChange={(e) => setActivityForm({ ...activityForm, venue: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateActivityOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-900 text-white font-bold hover:bg-rose-950 shadow-xs"
                >
                  Publish Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TASK MODAL */}
      {isCreateTaskOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-sm font-bold text-stone-900">Create Task for {activeSig.name}</h3>
              <button onClick={() => setIsCreateTaskOpen(false)} className="text-stone-400 hover:text-stone-700 text-sm">✕</button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement Transformer Tokenizer in C++"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Task Deliverables & Guidelines</label>
                <textarea
                  rows={3}
                  placeholder="Explain requirements and criteria for task acceptance..."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Deadline</label>
                  <input
                    type="date"
                    value={taskForm.deadline}
                    onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Gamification Reward Points</label>
                <input
                  type="number"
                  min={10}
                  max={200}
                  value={taskForm.pointsReward}
                  onChange={(e) => setTaskForm({ ...taskForm, pointsReward: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateTaskOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-900 text-white font-bold hover:bg-rose-950 shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD RESOURCE MODAL */}
      {isAddResourceOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-sm font-bold text-stone-900">Share Resource in {activeSig.name}</h3>
              <button onClick={() => setIsAddResourceOpen(false)} className="text-stone-400 hover:text-stone-700 text-sm">✕</button>
            </div>

            <form onSubmit={handleAddResource} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PyTorch Lightning Production Cheatsheet"
                  value={resourceForm.title}
                  onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Resource Type</label>
                <select
                  value={resourceForm.type}
                  onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none bg-white"
                >
                  <option value="pdf">PDF Handbook / Document</option>
                  <option value="repo">GitHub Repository / Source Code</option>
                  <option value="tutorial">Tutorial / Lab Walkthrough</option>
                  <option value="video">Recorded Video Lecture</option>
                  <option value="cheatsheet">Cheatsheet</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">URL / Document Link *</label>
                <input
                  type="url"
                  required
                  placeholder="https://resources.tce.edu/sigs/..."
                  value={resourceForm.url}
                  onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief note about the resource..."
                  value={resourceForm.description}
                  onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-rose-900 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddResourceOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-900 text-white font-bold hover:bg-rose-950 shadow-xs"
                >
                  Upload to Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
