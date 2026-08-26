import React, { useState } from 'react';
import {
  ExternalLink,
  Globe,
  Building2,
  Users,
  BookOpen,
  Sparkles,
  ChevronRight,
  Search,
  CheckCircle2,
  GraduationCap,
  X,
  Award
} from 'lucide-react';
import { SIG } from '../types';

interface TceOfficialExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sigs: SIG[];
  onSelectSig?: (sigId: string) => void;
}

export const TCE_DEPARTMENTS = [
  {
    code: 'CSE',
    name: 'Department of Computer Science & Engineering',
    shortName: 'CSE',
    established: '1984',
    hod: 'Dr. C. Deisy (Prof & Head)',
    officialUrl: 'https://www.tce.edu/dept/cse',
    icon: '💻',
    color: 'from-blue-600 to-indigo-700',
    description: 'Pioneering excellence in AI/ML, Cloud Systems, High Performance Computing, and Software Engineering.',
    sigIds: ['sig-ai', 'sig-cp', 'sig-cloud', 'sig-web'],
    highlights: ['NBA Tier-1 Accredited', 'AI & Deep Learning Center', 'Google Developer Group Chapter']
  },
  {
    code: 'IT',
    name: 'Department of Information Technology',
    shortName: 'IT',
    established: '1999',
    hod: 'Dr. R. A. Alaguraja (Prof & Head)',
    officialUrl: 'https://www.tce.edu/dept/it',
    icon: '🛡️',
    color: 'from-emerald-600 to-teal-700',
    description: 'Excelling in Information Security, Mobile Computing, Full-Stack Architecture, and Cryptography.',
    sigIds: ['sig-cyber', 'sig-app'],
    highlights: ['Cyber Threat Defense Range', 'Mobile App Incubation Studio', 'Cisco Networking Academy']
  },
  {
    code: 'ECE',
    name: 'Department of Electronics & Communication',
    shortName: 'ECE',
    established: '1968',
    hod: 'Dr. M. S. Balamurugan (Prof & Head)',
    officialUrl: 'https://www.tce.edu/dept/ece',
    icon: '📡',
    color: 'from-purple-600 to-indigo-800',
    description: 'Leading in VLSI semiconductor design, IoT sensor systems, 5G wireless networks, and RF communications.',
    sigIds: ['sig-iot', 'sig-vlsi'],
    highlights: ['Cadence VLSI Design Hub', 'Semiconductor Mission Lab', 'Texas Instruments Innovation Center']
  },
  {
    code: 'EEE',
    name: 'Department of Electrical & Electronics Engineering',
    shortName: 'EEE',
    established: '1957',
    hod: 'Dr. K. Ramesh (Prof & Head)',
    officialUrl: 'https://www.tce.edu/dept/eee',
    icon: '⚡',
    color: 'from-amber-500 to-orange-600',
    description: 'Transforming renewable energy grids, smart electric vehicles, power electronic drives, and battery tech.',
    sigIds: ['sig-renewable', 'sig-ev'],
    highlights: ['50kW Rooftop Solar Facility', 'Smart Microgrid Testbed', 'Schneider Electric Automation Lab']
  },
  {
    code: 'MECH',
    name: 'Department of Mechanical Engineering',
    shortName: 'Mechanical',
    established: '1957',
    hod: 'Dr. G. Kumaraguruparan (Prof & Head)',
    officialUrl: 'https://www.tce.edu/dept/mech',
    icon: '⚙️',
    color: 'from-slate-700 to-slate-900',
    description: 'Specializing in CAD/CAM, 3D Additive Manufacturing, Electric Race Vehicles, and Thermal Analysis.',
    sigIds: ['sig-mech-cad', 'sig-ev'],
    highlights: ['Additive Prototyping Maker Space', 'SAE BAJA Motorsports Studio', 'KUKA Industrial Robotics Cell']
  },
  {
    code: 'CIVIL',
    name: 'Department of Civil Engineering',
    shortName: 'Civil',
    established: '1957',
    hod: 'Dr. S. Kavitha (Prof & Head)',
    officialUrl: 'https://www.tce.edu/dept/civil',
    icon: '🏗️',
    color: 'from-stone-600 to-stone-800',
    description: 'Pioneering Building Information Modeling (BIM), satellite GIS mapping, and smart concrete structures.',
    sigIds: ['sig-civil-gis'],
    highlights: ['Drone GIS Survey Wing', 'BIM Architecture Studio', 'Madurai Smart City Technical Consultant']
  },
  {
    code: 'MTR',
    name: 'Department of Mechatronics Engineering',
    shortName: 'Mechatronics',
    established: '2005',
    hod: 'Dr. S. Balamurugan (Prof & Head)',
    officialUrl: 'https://www.tce.edu/dept/mechatronics',
    icon: '🤖',
    color: 'from-cyan-600 to-blue-700',
    description: 'Integrating robotics, ROS 2 autonomous navigation, PLC automation, and computer vision.',
    sigIds: ['sig-robotics', 'sig-iot'],
    highlights: ['Autonomous Mobile Robot Arena', 'Festo Pneumatics Testbed', 'Drone Swarm Aeronautics Hub']
  },
  {
    code: 'ARCH/MCA',
    name: 'Department of Architecture & Computer Applications',
    shortName: 'Design & MCA',
    established: '1995',
    hod: 'Prof. J. Vinoth (HOD In-charge)',
    officialUrl: 'https://www.tce.edu/dept/mca',
    icon: '🎨',
    color: 'from-rose-600 to-pink-700',
    description: 'Fusing Human-Computer Interaction (HCI), UI/UX atomic design systems, and digital enterprise software.',
    sigIds: ['sig-uiux', 'sig-web', 'sig-ds'],
    highlights: ['HCI Usability Testing Lab', 'Adobe Creative Hub', 'Figma Academic Design Guild']
  }
];

export const TceOfficialExplorerModal: React.FC<TceOfficialExplorerModalProps> = ({
  isOpen,
  onClose,
  sigs,
  onSelectSig
}) => {
  const [selectedDeptCode, setSelectedDeptCode] = useState<string>('CSE');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const currentDept = TCE_DEPARTMENTS.find(d => d.code === selectedDeptCode) || TCE_DEPARTMENTS[0];
  const deptSigs = sigs.filter(s => currentDept.sigIds.includes(s.id));

  const filteredDepts = TCE_DEPARTMENTS.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  TCE Official Website & Department SIG Directory
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LIVE CONNECT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Explore all official departments and Special Interest Groups of Thiagarajar College of Engineering
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <a
              href="https://www.tce.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>Visit tce.edu</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Navigation Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search departments, technologies, or SIGs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
            />
          </div>

          <div className="flex items-center space-x-1 text-xs overflow-x-auto pb-1 sm:pb-0">
            {filteredDepts.map(dept => (
              <button
                key={dept.code}
                onClick={() => setSelectedDeptCode(dept.code)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap text-xs transition-all ${
                  selectedDeptCode === dept.code
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="mr-1">{dept.icon}</span>
                <span>{dept.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Department Details & SIG Catalog Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: Department Profile Bento Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-2xs">
                      {currentDept.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        {currentDept.code} • Estd. {currentDept.established}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        {currentDept.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentDept.description}
                </p>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-semibold text-slate-500">Head of Department:</span>
                    <span className="font-bold text-slate-900">{currentDept.hod}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-semibold text-slate-500">Active SIGs Count:</span>
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                      {deptSigs.length} Groups
                    </span>
                  </div>
                </div>

                {/* Key Facilities & Badges */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Department Labs & Highlights
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentDept.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1 shrink-0" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Official Link Button */}
                <a
                  href={currentDept.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs shadow-xs transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open Official {currentDept.code} Portal (tce.edu)</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

            {/* Right Col: SIGs hosted under this Department */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Special Interest Groups in {currentDept.code}
                  </h4>
                  <p className="text-xs text-slate-600">
                    Students from any engineering branch can enroll in these interest groups.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {deptSigs.length} Active SIGs
                </span>
              </div>

              <div className="space-y-3">
                {deptSigs.length === 0 ? (
                  <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 text-slate-500 text-xs">
                    No active SIGs recorded under this filter yet.
                  </div>
                ) : (
                  deptSigs.map((sig) => (
                    <div
                      key={sig.id}
                      className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all text-slate-800 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl p-2 bg-slate-50 rounded-xl border border-slate-100">
                            {sig.logo || '🚀'}
                          </span>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900">{sig.name}</h5>
                            <span className="text-[10px] text-slate-500 font-medium">
                              Faculty Advisor: <strong className="text-slate-800">{sig.facultyAdvisor || 'TCE Faculty'}</strong>
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {sig.member_count} / {sig.max_members} Enrolled
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {sig.description}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1">
                        {sig.technologies.slice(0, 5).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-[11px] text-slate-500">
                          <span>📍 {sig.venue}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {onSelectSig && (
                            <button
                              onClick={() => {
                                onSelectSig(sig.id);
                                onClose();
                              }}
                              className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-colors flex items-center space-x-1"
                            >
                              <span>View & Join</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Synchronized with Thiagarajar College of Engineering (TCE Autonomous) Official Directory</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors"
          >
            Close Explorer
          </button>
        </div>

      </div>
    </div>
  );
};
