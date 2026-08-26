import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { SIG, User } from '../../types';
import {
  Users,
  Bell,
  Calendar,
  Sparkles,
  PlusCircle,
  Search,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  MapPin,
  Clock,
  Send,
  Filter,
  GraduationCap,
  Award,
  ChevronRight,
  RefreshCw,
  Mail,
  Layers,
  AlertCircle,
  FileText,
  Video,
  KeyRound,
  Lock
} from 'lucide-react';
import { TceOfficialExplorerModal } from '../TceOfficialExplorerModal';
import { ChangePasswordModal } from '../auth/ChangePasswordModal';

interface StudentRosterItem {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  department: string;
  year: string;
  avatar?: string;
  role: string;
  status: string;
  joined_at: string;
  points: number;
  badgesCount: number;
  tasksCompleted: number;
  activitiesAttended: number;
}

export const TeacherDashboard: React.FC = () => {
  const { user, showToast, allSigs } = useAuth();

  const [teacherSigs, setTeacherSigs] = useState<SIG[]>([]);
  const [selectedSigId, setSelectedSigId] = useState<string>('');
  const [roster, setRoster] = useState<StudentRosterItem[]>([]);
  const [isLoadingSigs, setIsLoadingSigs] = useState(true);
  const [isLoadingRoster, setIsLoadingRoster] = useState(false);
  const [rosterSearch, setRosterSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All');

  // Broadcast / Classroom Activity Modal state
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isTceModalOpen, setIsTceModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    message: '',
    category: 'workshops' as 'events' | 'workshops' | 'announcements' | 'general',
    priority: 'important' as 'normal' | 'important' | 'urgent',
    isClassroomActivity: true,
    eventDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    eventTime: '04:45 PM - 06:30 PM',
    eventVenue: 'TCE High Performance Computing Lab',
    meetingLink: ''
  });

  // Fetch teacher's advised SIGs
  const fetchTeacherSigs = async () => {
    try {
      setIsLoadingSigs(true);
      const res = await api.getTeacherSigs();
      setTeacherSigs(res.sigs || []);
      if (res.sigs && res.sigs.length > 0 && !selectedSigId) {
        setSelectedSigId(res.sigs[0].id);
      }
    } catch (err: any) {
      console.error(err);
      showToast('Failed to load advised SIGs', 'error');
    } finally {
      setIsLoadingSigs(false);
    }
  };

  useEffect(() => {
    fetchTeacherSigs();
  }, [user?.id]);

  // Fetch student roster for the selected SIG
  const fetchRoster = async (sigId: string) => {
    if (!sigId) return;
    try {
      setIsLoadingRoster(true);
      const res = await api.getSigRoster(sigId);
      setRoster(res.roster || []);
    } catch (err: any) {
      console.error(err);
      showToast('Failed to load student roster', 'error');
    } finally {
      setIsLoadingRoster(false);
    }
  };

  useEffect(() => {
    if (selectedSigId) {
      fetchRoster(selectedSigId);
      const currentSig = teacherSigs.find(s => s.id === selectedSigId);
      if (currentSig) {
        setBroadcastForm(prev => ({
          ...prev,
          eventVenue: currentSig.venue || 'TCE Department Lab'
        }));
      }
    }
  }, [selectedSigId, teacherSigs]);

  const selectedSig = teacherSigs.find(s => s.id === selectedSigId) || teacherSigs[0];

  // Handle Broadcast submit
  const handleBroadcastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSigId) {
      showToast('Please select a target SIG first.', 'error');
      return;
    }
    if (!broadcastForm.title.trim() || !broadcastForm.message.trim()) {
      showToast('Please enter both title and details.', 'error');
      return;
    }

    try {
      setIsPublishing(true);
      const res = await api.broadcastTeacherNotification(selectedSigId, {
        title: broadcastForm.title,
        message: broadcastForm.message,
        priority: broadcastForm.priority,
        category: broadcastForm.category,
        eventDate: broadcastForm.eventDate,
        eventTime: broadcastForm.eventTime,
        eventVenue: broadcastForm.eventVenue,
        meetingLink: broadcastForm.meetingLink || undefined,
        isClassroomActivity: broadcastForm.isClassroomActivity
      });

      showToast(res.message || 'Notification broadcasted to enrolled students!', 'success');
      setIsBroadcastModalOpen(false);
      // Reset form title/message
      setBroadcastForm(prev => ({
        ...prev,
        title: '',
        message: '',
        meetingLink: ''
      }));
    } catch (err: any) {
      showToast(err.message || 'Failed to broadcast notification', 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  // Filter roster
  const filteredRoster = roster.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(rosterSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(rosterSearch.toLowerCase()) ||
      s.department.toLowerCase().includes(rosterSearch.toLowerCase());
    
    const matchesYear = yearFilter === 'All' || s.year.toLowerCase().includes(yearFilter.toLowerCase());

    return matchesSearch && matchesYear;
  });

  const totalAdvisedStudents = teacherSigs.reduce((acc, curr) => acc + (curr.member_count || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Top Bento Header: Teacher Profile & Fast Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Profile Card (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                alt={user?.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-100 shadow-xs"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    Faculty Advisor & Teacher Portal
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    TCE Autonomous
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {user?.name || 'Faculty Advisor'}
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  {user?.designation || 'Professor & Faculty Advisor'} • {user?.department || 'Department of Computer Science & Engineering'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  📍 Cabin: <strong className="text-slate-800">{user?.cabinLocation || 'TCE Academic Block'}</strong> • Email: <span className="font-mono text-indigo-600">{user?.email}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsBroadcastModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs shadow-xs transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>Publish Notification / Activity</span>
              </button>

              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors border border-slate-200"
                title="Change Account Password"
              >
                <Lock className="w-4 h-4 text-slate-600" />
                <span>Change Password</span>
              </button>

              <button
                onClick={() => setIsTceModalOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors border border-slate-200"
                title="View All TCE Engineering Department SIGs"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Official TCE SIGs</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-500 text-[11px] block">Advised SIGs</span>
              <span className="text-lg font-bold text-slate-900">{teacherSigs.length} Groups</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-500 text-[11px] block">Total Enrolled Students</span>
              <span className="text-lg font-bold text-indigo-600">{totalAdvisedStudents} Students</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-500 text-[11px] block">Active Role</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                Faculty Incharge
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-500 text-[11px] block">Official Website</span>
              <a
                href="https://www.tce.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1 mt-1"
              >
                <span>tce.edu</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Card: Quick Broadcast Shortcut (4 Cols) */}
        <div className="lg:col-span-4 bg-indigo-950 text-white rounded-3xl p-6 border border-indigo-900 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-indigo-700/20 rounded-full blur-2xl pointer-events-none"></div>
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                CLASSROOM & NOTIFICATION BROADCAST
              </span>
              <Bell className="w-4 h-4 text-indigo-400 animate-bounce" />
            </div>

            <h3 className="text-base font-bold text-white mt-3">
              Broadcast to Enrolled Students
            </h3>
            <p className="text-xs text-indigo-200/80 mt-1 leading-relaxed">
              Post announcements for upcoming lab tests, classroom activities, hands-on workshops, or project sprint reviews. Enrolled students receive real-time notifications.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-indigo-900/60 flex items-center justify-between">
            <span className="text-xs text-indigo-300">Targeting {selectedSig ? selectedSig.name : 'Selected SIG'}</span>
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs transition-colors flex items-center space-x-1 shadow-xs"
            >
              <span>Compose</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* SIG Selector Tabs (Advised SIGs) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Your Advised Special Interest Groups (SIGs)
            </h3>
            <p className="text-xs text-slate-500">
              Select a SIG below to inspect the enrolled student roster and manage group notifications.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={fetchTeacherSigs}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Refresh SIGs"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingSigs ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* SIG Bento Grid Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {teacherSigs.map((sig) => {
            const isSelected = sig.id === selectedSigId;
            return (
              <button
                key={sig.id}
                onClick={() => setSelectedSigId(sig.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center space-x-3 truncate">
                    <span className="text-2xl p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      {sig.logo || '🚀'}
                    </span>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{sig.name}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">{sig.department}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1"></span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 w-full">
                  <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <strong>{sig.member_count}</strong>
                    <span>Students Enrolled</span>
                  </span>

                  <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-100">
                    Active Tenant
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Student Roster Section ("Who all are joined under the particular SIG") */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        
        {/* Section Header with Actions & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">
                  Enrolled Students Roster
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  {roster.length} Members in {selectedSig?.shortName || selectedSig?.name}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Live membership list of all students officially registered in this Special Interest Group.
              </p>
            </div>
          </div>

          {/* Controls: Search, Year Filter, and Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, roll no, email..."
                value={rosterSearch}
                onChange={(e) => setRosterSearch(e.target.value)}
                className="pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium w-48 sm:w-60"
              />
            </div>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
            >
              <option value="All">All Years</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>

            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send SIG Notice</span>
            </button>
          </div>
        </div>

        {/* Student Roster Table */}
        {isLoadingRoster ? (
          <div className="py-12 text-center text-xs text-slate-500 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-600 mx-auto" />
            <p>Loading enrolled students roster...</p>
          </div>
        ) : filteredRoster.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-2">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-semibold text-slate-700">No students found matching current filters.</p>
            <p className="text-slate-500 text-[11px]">Students can join this SIG anytime from the student discovery catalog.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Student Name</th>
                  <th className="pb-3 px-3">Roll Number</th>
                  <th className="pb-3 px-3">Department & Year</th>
                  <th className="pb-3 px-3">SIG Role</th>
                  <th className="pb-3 px-3">Enrolled On</th>
                  <th className="pb-3 px-3">Engagement</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredRoster.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{student.name}</p>
                          <span className="text-[11px] text-slate-500 font-mono">{student.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {student.rollNo}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <p className="font-medium text-slate-900">{student.department}</p>
                      <span className="text-[11px] text-slate-500">{student.year}</span>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        student.role === 'sig_owner' || student.role === 'sig_admin'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}>
                        {student.role === 'sig_owner' ? 'Student Lead' : student.role === 'sig_admin' ? 'Co-Lead' : 'Member'}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-500 font-medium">
                      {new Date(student.joined_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {student.points} pts
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {student.tasksCompleted} tasks • {student.activitiesAttended} sessions
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <a
                        href={`mailto:${student.email}?subject=[TCE ${selectedSig?.shortName}] Faculty Notice`}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                        title="Send Direct Email"
                      >
                        <Mail className="w-3 h-3 text-slate-600" />
                        <span>Email</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Broadcast Notification & Classroom Activity Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-indigo-600 text-white">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Publish SIG Notification / Classroom Activity
                  </h3>
                  <p className="text-xs text-slate-400">
                    Broadcasting to all {roster.length} students enrolled in <strong className="text-indigo-300">{selectedSig?.name}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleBroadcastSubmit} className="p-6 space-y-4 bg-slate-50 overflow-y-auto max-h-[75vh]">
              
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Notification Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mandatory Lab Session: PyTorch Distributed Training Sprint"
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Category
                  </label>
                  <select
                    value={broadcastForm.category}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    <option value="workshops">Hands-on Workshop / Classroom Activity</option>
                    <option value="events">Upcoming Technical Event / Hackathon</option>
                    <option value="announcements">Official SIG Announcement</option>
                    <option value="general">General Notice</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Priority Level
                  </label>
                  <select
                    value={broadcastForm.priority}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, priority: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important (Recommended)</option>
                    <option value="urgent">Urgent / Action Required</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Announcement / Classroom Activity Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide complete instructions, prerequisites, required software installations, and deliverables for this session..."
                  value={broadcastForm.message}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              {/* Classroom Session Details */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Session & Classroom Logistics
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Event / Classroom Date
                    </label>
                    <input
                      type="date"
                      value={broadcastForm.eventDate}
                      onChange={(e) => setBroadcastForm({ ...broadcastForm, eventDate: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Session Timing
                    </label>
                    <input
                      type="text"
                      placeholder="04:45 PM - 06:30 PM"
                      value={broadcastForm.eventTime}
                      onChange={(e) => setBroadcastForm({ ...broadcastForm, eventTime: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Classroom / Venue Location
                    </label>
                    <input
                      type="text"
                      placeholder="TCE High Performance Computing Lab"
                      value={broadcastForm.eventVenue}
                      onChange={(e) => setBroadcastForm({ ...broadcastForm, eventVenue: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Online Meeting Link (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://meet.google.com/xyz-abcd-efg"
                      value={broadcastForm.meetingLink}
                      onChange={(e) => setBroadcastForm({ ...broadcastForm, meetingLink: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPublishing}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isPublishing ? 'Broadcasting...' : 'Broadcast to Enrolled Students'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* TCE Official Explorer Modal */}
      <TceOfficialExplorerModal
        isOpen={isTceModalOpen}
        onClose={() => setIsTceModalOpen(false)}
        sigs={allSigs}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

    </div>
  );
};
