import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SIG } from '../../types';
import { api } from '../../lib/api';
import {
  Layers,
  PlusCircle,
  Users,
  Calendar,
  Sparkles,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Shield
} from 'lucide-react';

export const SigManagement: React.FC = () => {
  const { allSigs, refreshUserData, showToast } = useAuth();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSigForMembers, setSelectedSigForMembers] = useState<SIG | null>(null);
  const [sigMembers, setSigMembers] = useState<any[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);

  const [newSigForm, setNewSigForm] = useState({
    name: '',
    description: '',
    category: 'Robotics',
    department: 'Mechatronics & Mechanical',
    logo: '🤖',
    facultyAdvisor: 'Dr. S. Baskar',
    meetingSchedule: 'Wednesdays 4:45 PM - 6:30 PM',
    venue: 'TCE Advanced Robotics Lab',
    technologies: 'ROS2, Arduino, Python, C++',
    skillsGained: 'Kinematics, Sensor Fusion, Autonomous Navigation',
    objectives: 'Design autonomous rover prototypes and represent TCE in national robotics competitions',
    owner_name: 'Harish M.',
    owner_email: 'harish.m@student.tce.edu'
  });

  const handleCreateSig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: newSigForm.name,
        description: newSigForm.description,
        category: newSigForm.category,
        department: newSigForm.department,
        logo: newSigForm.logo,
        facultyAdvisor: newSigForm.facultyAdvisor,
        meetingSchedule: newSigForm.meetingSchedule,
        venue: newSigForm.venue,
        technologies: newSigForm.technologies.split(',').map(t => t.trim()),
        skillsGained: newSigForm.skillsGained.split(',').map(s => s.trim()),
        objectives: newSigForm.objectives.split('\n').filter(o => o.trim().length > 0),
        owner_name: newSigForm.owner_name,
        owner_email: newSigForm.owner_email
      };

      const res = await api.createSig(payload);
      showToast(res.message, 'success');
      setIsCreateModalOpen(false);
      await refreshUserData();
    } catch (err: any) {
      showToast(err.message || 'Failed to create SIG', 'error');
    }
  };

  const handleViewMembers = async (sig: SIG) => {
    try {
      setSelectedSigForMembers(sig);
      setIsLoadingMembers(true);
      const res = await api.getMembers(sig.id);
      setSigMembers(res.members || []);
    } catch (err: any) {
      showToast('Could not load members', 'error');
    } finally {
      setIsLoadingMembers(false);
    }
  };

  const handleDeleteSig = async (sigId: string) => {
    if (!confirm('Are you sure you want to permanently delete this SIG tenant? All isolated activities, tasks, and memberships will be purged.')) return;
    try {
      const res = await api.deleteSig(sigId);
      showToast(res.message, 'info');
      await refreshUserData();
    } catch (err: any) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  return (
    <div id="authority-sig-management" className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Special Interest Groups Directory & Governance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Charter, configure, and monitor multi-tenant student groups across TCE
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Charter New SIG</span>
        </button>
      </div>

      {/* SIGs Table - Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Group / Tenant</th>
                <th className="py-3.5 px-4">Department & Advisor</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Enrollment (Max 50)</th>
                <th className="py-3.5 px-4">Designated Owner</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allSigs.map((sig) => (
                <tr key={sig.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{sig.logo || '🚀'}</span>
                      <div>
                        <span className="font-bold text-slate-900 block">{sig.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {sig.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-800 block">{sig.department}</span>
                    <span className="text-[11px] text-slate-500">Adv: {sig.facultyAdvisor}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                      {sig.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">
                    {sig.member_count} / {sig.max_members}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-indigo-700 block">{sig.owner_name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => handleViewMembers(sig)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-800 transition-colors"
                      >
                        Roster
                      </button>
                      <button
                        onClick={() => handleDeleteSig(sig.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete SIG"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CHARTER NEW SIG MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Charter a New TCE Special Interest Group</h3>
                <p className="text-xs text-slate-500">Initializes an isolated tenant with designated faculty advisor & student lead</p>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700 text-base">✕</button>
            </div>

            <form onSubmit={handleCreateSig} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">SIG Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Autonomous Drones & Robotics SIG"
                    value={newSigForm.name}
                    onChange={(e) => setNewSigForm({ ...newSigForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Emoji Icon / Logo</label>
                  <input
                    type="text"
                    value={newSigForm.logo}
                    onChange={(e) => setNewSigForm({ ...newSigForm, logo: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Official mission and charter statement..."
                  value={newSigForm.description}
                  onChange={(e) => setNewSigForm({ ...newSigForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Department</label>
                  <input
                    type="text"
                    value={newSigForm.department}
                    onChange={(e) => setNewSigForm({ ...newSigForm, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newSigForm.category}
                    onChange={(e) => setNewSigForm({ ...newSigForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none bg-white"
                  >
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Faculty Advisor *</label>
                  <input
                    type="text"
                    required
                    value={newSigForm.facultyAdvisor}
                    onChange={(e) => setNewSigForm({ ...newSigForm, facultyAdvisor: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Initial Owner / Student Lead *</label>
                  <input
                    type="text"
                    required
                    value={newSigForm.owner_name}
                    onChange={(e) => setNewSigForm({ ...newSigForm, owner_name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Weekly Meeting Schedule</label>
                  <input
                    type="text"
                    value={newSigForm.meetingSchedule}
                    onChange={(e) => setNewSigForm({ ...newSigForm, meetingSchedule: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Primary Venue</label>
                  <input
                    type="text"
                    value={newSigForm.venue}
                    onChange={(e) => setNewSigForm({ ...newSigForm, venue: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={newSigForm.technologies}
                  onChange={(e) => setNewSigForm({ ...newSigForm, technologies: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xs"
                >
                  Charter & Initialize Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ROSTER MODAL */}
      {selectedSigForMembers && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{selectedSigForMembers.logo}</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {selectedSigForMembers.name} — Member Roster
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Total: {sigMembers.length}/50 Enrolled Students
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedSigForMembers(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            {isLoadingMembers ? (
              <div className="p-8 text-center text-xs text-slate-500">Loading roster...</div>
            ) : (
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
                {sigMembers.map((m) => (
                  <div key={m.user_id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{m.name}</span>
                      <p className="text-[10px] text-slate-500 font-mono">{m.email} • {m.department}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSigForMembers(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
