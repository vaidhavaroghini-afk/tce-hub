import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SIG } from '../../types';
import { api } from '../../lib/api';
import confetti from 'canvas-confetti';
import {
  Search,
  Filter,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ExternalLink,
  Info,
  Shield,
  BookOpen
} from 'lucide-react';

interface ExploreSigsProps {
  initialSelectedSigId?: string | null;
  onOpenWorkspace: (sigId: string) => void;
}

export const ExploreSigs: React.FC<ExploreSigsProps> = ({ initialSelectedSigId, onOpenWorkspace }) => {
  const { allSigs, joinedSigs, setActiveSigId, refreshUserData, showToast } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeModalSig, setActiveModalSig] = useState<SIG | null>(() => {
    if (initialSelectedSigId) {
      return allSigs.find(s => s.id === initialSelectedSigId) || null;
    }
    return null;
  });
  const [isJoining, setIsJoining] = useState(false);

  const categories = [
    'All',
    'Artificial Intelligence',
    'Cybersecurity',
    'Web Development',
    'Data Science',
    'IoT',
    'Robotics',
    'Programming',
    'App Development',
    'UI/UX',
    'Cloud Computing',
    'VLSI & Semiconductors',
    'Clean Energy & Power Grids',
    'Electric Vehicles',
    'CAD/CAM & Mechanical',
    'Geospatial & Civil GIS'
  ];

  const departments = [
    'All',
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Electrical',
    'Mechanical',
    'Civil',
    'Mechatronics',
    'Architecture',
    'Mathematics'
  ];

  const filteredSigs = useMemo(() => {
    return allSigs.filter(sig => {
      const matchSearch =
        sig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sig.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        sig.skillsGained.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCat = selectedCategory === 'All' || sig.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchDept = selectedDepartment === 'All' || sig.department.toLowerCase().includes(selectedDepartment.toLowerCase());

      return matchSearch && matchCat && matchDept;
    });
  }, [allSigs, searchTerm, selectedCategory, selectedDepartment]);

  const handleJoinSig = async (sigId: string) => {
    try {
      setIsJoining(true);
      const res = await api.joinSig(sigId);
      await refreshUserData();
      showToast(res.message || 'Joined SIG successfully!', 'success');
      
      // Celebratory confetti effect
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Update modal sig if open
      const updatedSig = allSigs.find(s => s.id === sigId);
      if (updatedSig) {
        setActiveModalSig({
          ...updatedSig,
          member_count: updatedSig.member_count + 1
        });
      }
    } catch (err: any) {
      showToast(err.message || 'Could not join SIG', 'error');
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeaveSig = async (sigId: string) => {
    if (!confirm('Are you sure you want to leave this Special Interest Group?')) return;
    try {
      setIsJoining(true);
      const res = await api.leaveSig(sigId);
      await refreshUserData();
      showToast(res.message || 'Left SIG successfully', 'info');
    } catch (err: any) {
      showToast(err.message || 'Could not leave SIG', 'error');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div id="sig-discovery-page" className="space-y-8 pb-16">
      
      {/* Search and Discovery Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Explore TCE Special Interest Groups (SIGs)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Discover official student-led domain research & engineering groups at Thiagarajar College of Engineering.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-indigo-600 font-bold">{filteredSigs.length}</strong> of {allSigs.length} SIGs
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="sig-search-input"
            type="text"
            placeholder="Search by SIG name, technology (e.g. PyTorch, React, ROS2), or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* SIG Cards Grid */}
      {filteredSigs.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center bg-slate-50">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No SIGs matched your search criteria</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing filters or search for another keyword like "AI", "Cloud", or "Robotics".</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedDepartment('All');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSigs.map((sig) => {
            const isMember = joinedSigs.some(js => js.sig_id === sig.id);
            const isAtCapacity = (sig.member_count || 0) >= (sig.max_members || 50);

            return (
              <div
                key={sig.id}
                className="rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Top Bar with Logo, Name and Capacity */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                        {sig.logo || '🚀'}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                          {sig.name}
                        </h3>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                          {sig.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {sig.description}
                  </p>

                  {/* Capacity Bar (Constraint 5: Max 50 members) */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-medium text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Member Capacity</span>
                      </span>
                      <span className={`font-mono font-bold ${isAtCapacity ? 'text-rose-600' : 'text-slate-700'}`}>
                        {sig.member_count}/{sig.max_members}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${isAtCapacity ? 'bg-rose-600' : 'bg-indigo-600'}`}
                        style={{ width: `${Math.min(100, ((sig.member_count || 1) / (sig.max_members || 50)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sig.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {sig.technologies.length > 4 && (
                      <span className="text-[10px] text-slate-400 font-medium self-center">
                        +{sig.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalSig(sig)}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center space-x-1"
                  >
                    <span>View Profile</span>
                    <Info className="w-3 h-3 text-slate-400" />
                  </button>

                  {isMember ? (
                    <button
                      onClick={() => {
                        setActiveSigId(sig.id);
                        onOpenWorkspace(sig.id);
                      }}
                      className="py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Workspace</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinSig(sig.id)}
                      disabled={isJoining || isAtCapacity}
                      className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                        isAtCapacity
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                      }`}
                    >
                      <span>{isAtCapacity ? 'Full (50/50)' : 'Join SIG'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed SIG Profile Modal */}
      {activeModalSig && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            
            {/* Modal Hero Banner */}
            <div className="relative bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
              <button
                onClick={() => setActiveModalSig(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                ✕
              </button>

              <div className="flex items-start space-x-4">
                <span className="text-4xl p-3 rounded-2xl bg-slate-800 border border-slate-700">
                  {activeModalSig.logo || '🚀'}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                      {activeModalSig.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {activeModalSig.department}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {activeModalSig.name}
                  </h2>
                  <p className="text-xs text-slate-300">
                    Faculty Advisor: <strong className="text-white">{activeModalSig.facultyAdvisor}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
              
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  About the Special Interest Group
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeModalSig.description}
                </p>
              </div>

              {/* Key Objectives */}
              {activeModalSig.objectives?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Core Objectives & Research Focus
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {activeModalSig.objectives.map((obj, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies & Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h5 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Technologies & Tooling</span>
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalSig.technologies.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h5 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Skills You Will Gain</span>
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalSig.skillsGained.map((sk, idx) => (
                      <span key={idx} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule & Venue Info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Weekly Schedule</span>
                    <span className="font-bold text-slate-800">{activeModalSig.meetingSchedule}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Primary Venue</span>
                    <span className="font-bold text-slate-800">{activeModalSig.venue}</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              {activeModalSig.achievements?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Recent Group Achievements & Honors
                  </h4>
                  <div className="space-y-1.5">
                    {activeModalSig.achievements.map((ach, i) => (
                      <div key={i} className="text-xs text-amber-900 bg-amber-50 border border-amber-200/80 p-2.5 rounded-xl flex items-center space-x-2">
                        <span className="text-amber-500">🏆</span>
                        <span className="font-medium">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer with Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Capacity: <strong className="text-slate-800 font-mono">{activeModalSig.member_count}/50 Members</strong>
              </div>

              <div className="flex items-center space-x-3">
                {joinedSigs.some(js => js.sig_id === activeModalSig.id) ? (
                  <>
                    <button
                      onClick={() => handleLeaveSig(activeModalSig.id)}
                      disabled={isJoining}
                      className="px-3.5 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                    >
                      Leave SIG
                    </button>
                    <button
                      onClick={() => {
                        setActiveSigId(activeModalSig.id);
                        setActiveModalSig(null);
                        onOpenWorkspace(activeModalSig.id);
                      }}
                      className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
                    >
                      Open Active Workspace
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleJoinSig(activeModalSig.id)}
                    disabled={isJoining || (activeModalSig.member_count || 0) >= 50}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs disabled:opacity-50"
                  >
                    {isJoining ? 'Enrolling...' : (activeModalSig.member_count || 0) >= 50 ? 'Capacity Full (50/50)' : 'Join This SIG'}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
