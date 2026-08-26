import { User, SIG, Membership, Activity, Task, Notification, SIGResource, Badge, LeaderboardEntry, StudentJourneySummary } from '../src/types';

export interface DatabaseState {
  users: User[];
  sigs: SIG[];
  memberships: Membership[];
  activities: Activity[];
  tasks: Task[];
  notifications: Notification[];
  resources: SIGResource[];
  userReadNotificationIds: Record<string, string[]>; // userId -> array of notificationIds
  userPasswords: Record<string, string>; // userId -> password
  userHasSetPassword: Record<string, boolean>; // userId -> boolean
  resetOtps: Record<string, { otp: string; expiresAt: number }>; // lowercase email -> OTP info
}

// Initial Seed Data representing Official TCE Special Interest Groups
export const initialSigs: SIG[] = [
  {
    id: 'sig-ai',
    name: 'Artificial Intelligence & Machine Learning SIG',
    shortName: 'AI & ML SIG',
    description: 'Empowering TCE students with cutting-edge Deep Learning, Natural Language Processing, Generative AI, PyTorch, and Computer Vision through industrial research projects and workshops.',
    category: 'Artificial Intelligence',
    department: 'Department of Computer Science & Engineering',
    logo: '🤖',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-ai',
    owner_name: 'Vignesh K. (SIG Lead) & Dr. C. Deisy (Faculty Advisor)',
    member_count: 34,
    max_members: 50,
    objectives: [
      'Master Neural Networks, Transformers, and LLM fine-tuning techniques',
      'Publish research in IEEE/ACM student symposiums',
      'Build applied AI solutions for campus automation & smart healthcare'
    ],
    technologies: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'OpenCV', 'Scikit-learn'],
    skillsGained: ['Deep Learning', 'Computer Vision', 'Generative AI', 'Model Deployment', 'Prompt Engineering'],
    achievements: [
      '1st Place in Smart India Hackathon (AI Category) 2025',
      '3 Research Papers published in IEEE INDICON 2025',
      'Conducted TCE GenAI Summit with 300+ attendees'
    ],
    meetingSchedule: 'Every Wednesday, 4:45 PM - 6:30 PM',
    venue: 'TCE Advanced AI Research Lab (Room CSE-302)',
    facultyAdvisor: 'Dr. C. Deisy, Professor, CSE',
    status: 'active',
    created_at: '2025-06-15T09:00:00Z'
  },
  {
    id: 'sig-cyber',
    name: 'Cybersecurity & Ethical Hacking SIG',
    shortName: 'TCE Infosec SIG',
    description: 'Dedicated to ethical hacking, CTF competitions, digital forensics, reverse engineering, web penetration testing, and zero-trust defensive architectures.',
    category: 'Cybersecurity',
    department: 'Department of Information Technology',
    logo: '🛡️',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-cyber',
    owner_name: 'Kavitha M. (Lead) & Dr. R. A. Alaguraja (Advisor)',
    member_count: 28,
    max_members: 50,
    objectives: [
      'Train students for national and global Capture-the-Flag (CTF) competitions',
      'Conduct regular vulnerability assessment and penetration testing labs',
      'Promote secure coding guidelines across all student tech projects'
    ],
    technologies: ['Kali Linux', 'Burp Suite', 'Wireshark', 'Metasploit', 'Ghidra', 'Docker'],
    skillsGained: ['Penetration Testing', 'Network Security', 'Cryptography', 'Binary Exploitation', 'SOC Analysis'],
    achievements: [
      'Top 10 Finalist in DEFCON India CTF 2025',
      'Secured TCE Internal Campus Intranet Audit commendation',
      'Bug bounty Hall of Fame recognition for 4 member students'
    ],
    meetingSchedule: 'Every Friday, 4:45 PM - 6:30 PM',
    venue: 'Information Security & Cloud Lab (IT Block Room 204)',
    facultyAdvisor: 'Dr. R. A. Alaguraja, Assoc. Prof., IT',
    status: 'active',
    created_at: '2025-06-18T10:00:00Z'
  },
  {
    id: 'sig-web',
    name: 'Web & Cloud Development SIG',
    shortName: 'Web & Cloud SIG',
    description: 'Fostering modern full-stack development, serverless cloud architectures, scalable microservices, containerization, and enterprise DevOps workflows.',
    category: 'Web Development',
    department: 'Department of Computer Science & Applications',
    logo: '🌐',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-web',
    owner_name: 'Harish Babu (Lead) & Dr. S. Sridevi (Advisor)',
    member_count: 42,
    max_members: 50,
    objectives: [
      'Master React, Next.js, Node.js, and TypeScript production architectures',
      'Deploy resilient infrastructure using AWS, GCP, Docker, and Kubernetes',
      'Architect open-source tooling for TCE student body'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'TailwindCSS'],
    skillsGained: ['Full-Stack Engineering', 'Cloud Deployment', 'API Design', 'DevOps & CI/CD', 'Database Tuning'],
    achievements: [
      'Engineered the TCE Campus Portal micro-service ecosystem',
      'Winner of HackTCE 2025 Web Track',
      'Over 20 open-source repositories contributed to TCE GitHub'
    ],
    meetingSchedule: 'Every Tuesday, 4:45 PM - 6:30 PM',
    venue: 'Software Systems Lab (Main Building Room 118)',
    facultyAdvisor: 'Dr. S. Sridevi, Assistant Professor, MCA',
    status: 'active',
    created_at: '2025-06-20T08:30:00Z'
  },
  {
    id: 'sig-ds',
    name: 'Data Science & Big Data Analytics SIG',
    shortName: 'Data Science SIG',
    description: 'Transforming raw real-world data into actionable intelligence through predictive modeling, big data pipelines, statistical inferences, and data storytelling.',
    category: 'Data Science',
    department: 'Department of Mathematics & Data Science',
    logo: '📊',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-ds',
    owner_name: 'Ananya S. (Lead) & Dr. K. Arun (Advisor)',
    member_count: 31,
    max_members: 50,
    objectives: [
      'Deep dive into Exploratory Data Analysis, Feature Engineering, and Stats',
      'Process massive datasets with Apache Spark and distributed computing',
      'Build end-to-end analytics dashboards and Kaggle competitive pipelines'
    ],
    technologies: ['Python', 'Pandas', 'Apache Spark', 'SQL', 'Tableau', 'Scipy', 'PowerBI'],
    skillsGained: ['Data Wrangling', 'Big Data Engineering', 'Statistical Modeling', 'Visualization', 'A/B Testing'],
    achievements: [
      'Kaggle Grandmaster track mentorship with 12 medals earned',
      'Published Tamil Nadu Agricultural Yield Forecast Open Dataset',
      '1st Place in Inter-College Data Viz Championship'
    ],
    meetingSchedule: 'Every Monday, 4:45 PM - 6:30 PM',
    venue: 'Data Analytics & Computing Center (Library 2nd Floor)',
    facultyAdvisor: 'Dr. K. Arun, Associate Professor, CSE',
    status: 'active',
    created_at: '2025-06-22T11:00:00Z'
  },
  {
    id: 'sig-iot',
    name: 'IoT & Embedded Systems SIG',
    shortName: 'IoT & Embedded SIG',
    description: 'Bridging physical hardware and cyber-physical networks with microcontrollers, sensor nodes, LoRaWAN protocols, Edge AI, and smart campus automation.',
    category: 'IoT',
    department: 'Department of Electronics & Communication Engineering',
    logo: '⚡',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-iot',
    owner_name: 'Rahul V. (Lead) & Dr. M. S. Balamurugan (Advisor)',
    member_count: 26,
    max_members: 50,
    objectives: [
      'Design custom PCB layouts and sensor interfacing circuits',
      'Deploy LoRaWAN gateways across TCE campus for energy monitoring',
      'Program RTOS on ARM Cortex and ESP32 microcontrollers'
    ],
    technologies: ['ESP32', 'Arduino', 'Raspberry Pi', 'FreeRTOS', 'MQTT', 'KiCAD', 'Embedded C++'],
    skillsGained: ['Circuit Design', 'Firmware Development', 'Sensor Networks', 'Edge AI', 'Wireless Protocols'],
    achievements: [
      'Built TCE Campus Smart Water & Power Monitoring telemetry',
      'Won Texas Instruments India Innovation Design Award 2025',
      'Secured 2 patents filed through TCE IPR Cell'
    ],
    meetingSchedule: 'Every Thursday, 4:45 PM - 6:30 PM',
    venue: 'Embedded Systems & VLSI Lab (ECE Block Ground Floor)',
    facultyAdvisor: 'Dr. M. S. Balamurugan, Professor, ECE',
    status: 'active',
    created_at: '2025-06-25T09:15:00Z'
  },
  {
    id: 'sig-robotics',
    name: 'Robotics & Autonomous Systems SIG',
    shortName: 'Robotics SIG',
    description: 'Pioneering kinematic mechanics, autonomous mobile navigation, ROS2 simulations, drone aerial robotics, and industrial robotic arm automation.',
    category: 'Robotics',
    department: 'Department of Mechatronics & Mechanical Engineering',
    logo: '🦾',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-robotics',
    owner_name: 'Dinesh K. (Lead) & Dr. G. Kumaraguruparan (Advisor)',
    member_count: 22,
    max_members: 50,
    objectives: [
      'Design autonomous rovers with LIDAR and SLAM navigation algorithms',
      'Develop multi-rotor UAV drone controllers and autonomous payload drop',
      'Compete in national Robocon and e-Yantra robotic challenges'
    ],
    technologies: ['ROS2', 'Gazebo', 'Python', 'OpenCV', 'SolidWorks', '3D Printing', 'STM32'],
    skillsGained: ['Robot Kinematics', 'SLAM Navigation', 'Computer Vision for Robotics', 'CAD Modeling', 'Drone Avionics'],
    achievements: [
      'National Finalist at IIT Bombay e-Yantra Robotics Challenge',
      'Developed autonomous campus courier rover prototype',
      'Best Mechanical Design at Robocon Zonal 2025'
    ],
    meetingSchedule: 'Every Saturday, 10:00 AM - 1:00 PM',
    venue: 'TCE Mechatronics Robotics Workshop & Maker Space',
    facultyAdvisor: 'Dr. G. Kumaraguruparan, Associate Professor, Mech',
    status: 'active',
    created_at: '2025-06-28T14:00:00Z'
  },
  {
    id: 'sig-cp',
    name: 'Competitive Programming & Algorithms SIG',
    shortName: 'CP & Algo SIG',
    description: 'Mastering algorithmic problem solving, graph theory, dynamic programming, number theory, and rigorous training for ACM-ICPC and top-tier technical interviews.',
    category: 'Programming',
    department: 'Department of Computer Science & Engineering',
    logo: '💻',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-cp',
    owner_name: 'Siddharth M. (Lead) & Dr. S. Mercy (Advisor)',
    member_count: 45,
    max_members: 50,
    objectives: [
      'Systematic mastery of advanced data structures and optimization algorithms',
      'Weekly TCE CodeSprint contests and problem editorial breakdowns',
      'Qualify multiple teams for ACM-ICPC Regional and World Finals'
    ],
    technologies: ['C++20', 'STL', 'Python', 'Codeforces', 'LeetCode', 'AtCoder', 'CSES'],
    skillsGained: ['Algorithmic Optimization', 'Dynamic Programming', 'Graph Theory', 'Time/Space Complexity', 'ICPC Strategy'],
    achievements: [
      'Ranked #1 Engineering College in Tamil Nadu on Codeforces College Rankings',
      '3 Teams qualified for ACM-ICPC Amritapuri Regionals 2025',
      '100% placement track in Tier-1 product tech companies'
    ],
    meetingSchedule: 'Every Monday & Thursday, 5:00 PM - 7:00 PM',
    venue: 'TCE Programming Excellence Center (CSE Block Room 102)',
    facultyAdvisor: 'Dr. S. Mercy, Associate Professor, CSE',
    status: 'active',
    created_at: '2025-07-01T08:00:00Z'
  },
  {
    id: 'sig-app',
    name: 'Mobile App Development SIG',
    shortName: 'App Dev SIG',
    description: 'Crafting responsive, beautiful, high-performance mobile applications using Flutter, Kotlin, Jetpack Compose, iOS Swift, and Firebase cloud integrations.',
    category: 'App Development',
    department: 'Department of Information Technology',
    logo: '📱',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-app',
    owner_name: 'Swetha N. (Lead) & Dr. K. Indira (Advisor)',
    member_count: 36,
    max_members: 50,
    objectives: [
      'Build native and multi-platform mobile apps for Android & iOS',
      'Implement offline-first local storage, SQLite/Room, and Push Notifications',
      'Publish utility apps on Google Play Store for TCE student community'
    ],
    technologies: ['Flutter', 'Dart', 'Kotlin', 'Jetpack Compose', 'Firebase', 'SwiftUI', 'REST APIs'],
    skillsGained: ['Mobile UI Engineering', 'State Management (Riverpod/Bloc)', 'Mobile Performance Tuning', 'App Store Deployment'],
    achievements: [
      'Published official TCE Bus Route & Mess Menu Student App with 4000+ active downloads',
      'Google Solution Challenge Top 100 Finalist',
      'Winner of Android Dev Fest Chennai 2025'
    ],
    meetingSchedule: 'Every Wednesday, 4:45 PM - 6:30 PM',
    venue: 'Mobile Applications Lab (IT Block 3rd Floor)',
    facultyAdvisor: 'Dr. K. Indira, Assistant Professor, IT',
    status: 'active',
    created_at: '2025-07-05T12:00:00Z'
  },
  {
    id: 'sig-uiux',
    name: 'UI/UX Design & HCI SIG',
    shortName: 'UI/UX & HCI SIG',
    description: 'Fusing psychology, visual design, design systems, usability research, accessibility, and interactive prototyping to build human-centered software experiences.',
    category: 'UI/UX',
    department: 'Department of Architecture & Computer Applications',
    logo: '🎨',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-uiux',
    owner_name: 'Meera Krishnan (Lead) & Prof. J. Vinoth (Advisor)',
    member_count: 29,
    max_members: 50,
    objectives: [
      'Master Figma, Adobe XD, design tokens, and scalable atomic design systems',
      'Execute usability testing, heuristic evaluations, and wireframing sprints',
      'Partner with developer SIGs to craft production-ready user interfaces'
    ],
    technologies: ['Figma', 'FigJam', 'Framer', 'Design Systems', 'WCAG 2.1', 'Protopie', 'UserTesting'],
    skillsGained: ['User Research', 'Information Architecture', 'Interaction Design', 'Micro-Animations', 'Design Audits'],
    achievements: [
      'Redesigned the TCE Digital Library and Student Grievance Portal UI',
      'Winner of Adobe Creative Jam National Design Challenge 2025',
      'Mentored 150+ students in Figma design sprints'
    ],
    meetingSchedule: 'Every Friday, 4:45 PM - 6:30 PM',
    venue: 'Human-Computer Interaction Studio (Architecture Block)',
    facultyAdvisor: 'Prof. J. Vinoth, Assistant Professor, Architecture',
    status: 'active',
    created_at: '2025-07-10T10:30:00Z'
  },
  {
    id: 'sig-cloud',
    name: 'Cloud Computing & DevOps SIG',
    shortName: 'Cloud & DevOps SIG',
    description: 'Architecting resilient cloud-native infrastructure, Kubernetes clusters, Terraform infrastructure-as-code, CI/CD automation pipelines, and site reliability.',
    category: 'Cloud Computing',
    department: 'Department of Computer Science & Engineering',
    logo: '☁️',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-admin-cloud',
    owner_name: 'Gowtham R. (Lead) & Dr. B. Subhashree (Advisor)',
    member_count: 33,
    max_members: 50,
    objectives: [
      'Hands-on AWS, GCP, and Azure multi-cloud architecture setups',
      'Automate infrastructure with Terraform, Ansible, and Helm charts',
      'Implement monitoring, metrics, and incident recovery with Prometheus and Grafana'
    ],
    technologies: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus'],
    skillsGained: ['Infrastructure as Code', 'Container Orchestration', 'Site Reliability Engineering', 'Cloud Security'],
    achievements: [
      'Architected high-availability load balanced clusters for TCE Fest registration',
      'AWS Community Day India Student Speaker selection',
      'Over 25 cloud practitioner certifications achieved by members'
    ],
    meetingSchedule: 'Every Tuesday, 4:45 PM - 6:30 PM',
    venue: 'Cloud & Grid Computing Center (Main Block Room 220)',
    facultyAdvisor: 'Dr. B. Subhashree, Associate Professor, CSE',
    facultyAdvisorEmail: 'dr.b.subhashree@tce.edu',
    officialTceUrl: 'https://www.tce.edu/dept/cse',
    tceDeptCode: 'CSE',
    status: 'active',
    created_at: '2025-07-12T15:00:00Z'
  },
  {
    id: 'sig-vlsi',
    name: 'VLSI Design & Semiconductor Technology SIG',
    shortName: 'VLSI & Chips SIG',
    description: 'Specialized in ASIC/FPGA digital design, Verilog/VHDL modeling, cadence synthesis, physical design verification, and semiconductor nano-electronics.',
    category: 'Electronics',
    department: 'Department of Electronics & Communication Engineering',
    tceDeptCode: 'ECE',
    logo: '⚡',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-teacher-balamurugan',
    owner_name: 'Dr. M. S. Balamurugan & ECE Core Team',
    member_count: 26,
    max_members: 50,
    objectives: [
      'Hands-on RTL design and FPGA prototyping on Xilinx Vivado boards',
      'Cadence layout design, DRC/LVS physical verification and timing closure',
      'Publish VLSI architecture research in IEEE CAS symposiums'
    ],
    technologies: ['Verilog', 'SystemVerilog', 'Cadence Virtuoso', 'Xilinx Vivado', 'Synopsys', 'FPGA'],
    skillsGained: ['RTL Design', 'Static Timing Analysis', 'FPGA Prototyping', 'ASIC Flow', 'CMOS Analog Layout'],
    achievements: [
      'Fabricated test chip prototype under India Semiconductor Mission (ISM)',
      '1st prize in Cadence National Design Contest 2025',
      '100% placement rate in top semiconductor MNCs (Qualcomm, TI, Intel)'
    ],
    meetingSchedule: 'Every Monday, 4:45 PM - 6:30 PM',
    venue: 'Cadence VLSI Design Centre (ECE Block Room 312)',
    facultyAdvisor: 'Dr. M. S. Balamurugan, Professor, ECE',
    facultyAdvisorEmail: 'dr.m.balamurugan@tce.edu',
    officialTceUrl: 'https://www.tce.edu/dept/ece',
    status: 'active',
    created_at: '2025-07-01T09:00:00Z'
  },
  {
    id: 'sig-renewable',
    name: 'Renewable Energy, Smart Grid & Power Systems SIG',
    shortName: 'Smart Grid SIG',
    description: 'Empowering students in solar photovoltaic modeling, microgrids, green energy storage, IoT smart meters, and high-voltage power system analytics.',
    category: 'Electrical Engineering',
    department: 'Department of Electrical & Electronics Engineering',
    tceDeptCode: 'EEE',
    logo: '🔋',
    coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-teacher-ramesh',
    owner_name: 'Dr. K. Ramesh & Green Energy Team',
    member_count: 22,
    max_members: 50,
    objectives: [
      'Design MATLAB/Simulink models for grid-tied solar PV systems and MPPT',
      'Deploy IoT smart energy meters across TCE campus for real-time telemetry',
      'Execute pilot battery management testing for campus microgrids'
    ],
    technologies: ['MATLAB/Simulink', 'ETAP', 'Arduino IoT', 'Power World', 'LabVIEW', 'PVsyst'],
    skillsGained: ['Power Electronics', 'Microgrid Automation', 'Energy Auditing', 'Grid Integration', 'PLC Programming'],
    achievements: [
      'Commissioned 50kW TCE Campus Rooftop Solar Monitoring dashboard',
      'Best Renewable Innovation Award at IEEE PES 2025',
      'Published 2 papers in Elsevier Applied Energy Journal'
    ],
    meetingSchedule: 'Every Thursday, 4:45 PM - 6:30 PM',
    venue: 'High Voltage & Power Systems Lab (EEE Block Room 115)',
    facultyAdvisor: 'Dr. K. Ramesh, Professor, EEE',
    facultyAdvisorEmail: 'dr.k.ramesh@tce.edu',
    officialTceUrl: 'https://www.tce.edu/dept/eee',
    status: 'active',
    created_at: '2025-07-02T10:00:00Z'
  },
  {
    id: 'sig-ev',
    name: 'Electric Vehicle & Battery Technology SIG',
    shortName: 'EV Tech SIG',
    description: 'Designing electric powertrains, battery thermal management systems (BTMS), motor controllers, regenerative braking, and SAE Baja EV race cars.',
    category: 'Automotive & EV',
    department: 'Interdisciplinary (EEE & Mechanical Engineering)',
    tceDeptCode: 'EEE',
    logo: '🏎️',
    coverImage: 'https://images.unsplash.com/photo-1558441719-8b489c63f771?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-teacher-kumaraguruparan',
    owner_name: 'Dr. G. Kumaraguruparan & Team TCE Motorsports',
    member_count: 35,
    max_members: 50,
    objectives: [
      'Build competition-ready electric all-terrain vehicles (e-ATV) for SAE BAJA',
      'Develop custom CAN-bus integrated Battery Management Systems (BMS)',
      'Optimize BLDC and PMSM motor field-oriented control algorithms'
    ],
    technologies: ['ANSYS Fluent', 'SolidWorks', 'MATLAB Simscape', 'CAN-Bus', 'STM32', 'LiFePO4 Cells'],
    skillsGained: ['Battery Pack Assembly', 'Thermal Analysis', 'Motor Control', 'Chassis Engineering', 'Telemetry'],
    achievements: [
      'All-India Rank 4 in SAE BAJA e-BAJA 2025 Competition (Pithampur)',
      'Engineered indigenous fast-charging module for TCE campus carts',
      'Filed patent on Smart Regenerative Braking System'
    ],
    meetingSchedule: 'Every Saturday, 2:00 PM - 5:00 PM',
    venue: 'TCE Motorsports Fabrication Center & EV Lab (Mech Annex)',
    facultyAdvisor: 'Dr. G. Kumaraguruparan, Associate Professor, Mech',
    facultyAdvisorEmail: 'dr.g.kumaraguruparan@tce.edu',
    officialTceUrl: 'https://www.tce.edu/dept/mech',
    status: 'active',
    created_at: '2025-06-25T14:00:00Z'
  },
  {
    id: 'sig-civil-gis',
    name: 'Smart Structures, BIM & GIS Mapping SIG',
    shortName: 'Smart Civil & GIS',
    description: 'Integrating Building Information Modeling (BIM), satellite remote sensing, structural health monitoring, smart cities GIS mapping, and sustainable green concrete.',
    category: 'Civil Engineering',
    department: 'Department of Civil Engineering',
    tceDeptCode: 'CIVIL',
    logo: '🏗️',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-teacher-kavitha',
    owner_name: 'Dr. S. Kavitha & Civil Innovation Crew',
    member_count: 24,
    max_members: 50,
    objectives: [
      'Develop 3D BIM models for sustainable infrastructure using Revit and Navisworks',
      'Execute drone surveying and GIS flood vulnerability mapping for Madurai district',
      'Conduct sensor-based structural health tests on prestressed concrete bridges'
    ],
    technologies: ['AutoCAD', 'Revit BIM', 'QGIS', 'ArcGIS', 'STAAD Pro', 'ETABS', 'DJI Drone Mapping'],
    skillsGained: ['BIM Coordination', 'Spatial Data Analysis', 'Structural Analysis', 'Drone Photogrammetry', 'Green Building Audits'],
    achievements: [
      'Madurai Smart City GIS mapping consultancy project completed with Collectorate',
      '1st Place in National BIM Championship 2025',
      'Constructed eco-friendly geo-polymer pavement trial on TCE campus'
    ],
    meetingSchedule: 'Every Wednesday, 4:45 PM - 6:30 PM',
    venue: 'CAD & Surveying Laboratory (Civil Block Room CE-206)',
    facultyAdvisor: 'Dr. S. Kavitha, Associate Professor, Civil',
    facultyAdvisorEmail: 'dr.s.kavitha@tce.edu',
    officialTceUrl: 'https://www.tce.edu/dept/civil',
    status: 'active',
    created_at: '2025-07-04T11:00:00Z'
  },
  {
    id: 'sig-mech-cad',
    name: 'Advanced CAD/CAM, Robotics & 3D Additive Manufacturing SIG',
    shortName: 'Digital Mech SIG',
    description: 'Hands-on 3D printing, CNC machining, finite element stress modeling, generative design, and industrial robot arms programming.',
    category: 'Mechanical Engineering',
    department: 'Department of Mechanical Engineering',
    tceDeptCode: 'MECH',
    logo: '⚙️',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    owner_id: 'user-teacher-kumaraguruparan',
    owner_name: 'Dr. G. Kumaraguruparan & Mechanical Lead',
    member_count: 29,
    max_members: 50,
    objectives: [
      'Operate high-precision SLA/FDM 3D printers and multi-axis CNC machines',
      'Perform non-linear structural and CFD simulations using ANSYS Workbench',
      'Fabricate custom end-effectors for KUKA industrial robots'
    ],
    technologies: ['SolidWorks', 'PTC Creo', 'ANSYS Mechanical', 'Fusion 360', 'Cura 3D', 'Mastercam'],
    skillsGained: ['Generative Design', 'FEA Simulation', 'Rapid Prototyping', 'GD&T', 'Toolpath Optimization'],
    achievements: [
      'Supplied custom 3D-printed prosthetic hands for Madurai rehabilitation trust',
      'Best Design Award in International Additive Manufacturing Expo 2025',
      'Established 24/7 student rapid prototyping maker studio at TCE'
    ],
    meetingSchedule: 'Every Friday, 4:45 PM - 6:30 PM',
    venue: 'Centre for Additive Manufacturing & 3D Printing (Mech Block Room M-104)',
    facultyAdvisor: 'Dr. G. Kumaraguruparan, Associate Professor, Mech',
    facultyAdvisorEmail: 'dr.g.kumaraguruparan@tce.edu',
    officialTceUrl: 'https://www.tce.edu/dept/mech',
    status: 'active',
    created_at: '2025-07-06T13:00:00Z'
  }
];

export const initialUsers: User[] = [
  {
    id: 'user-student-a',
    name: 'Karthik S.',
    email: 'karthik.s@student.tce.edu',
    role: 'student',
    department: 'Computer Science and Engineering',
    year: '3rd Year (Batch 2023-2027)',
    rollNo: '23CS042',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    skills: ['Python', 'PyTorch', 'Data Science', 'Pandas', 'SQL'],
    interests: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Deep Learning'],
    points: 380,
    badges: [
      {
        id: 'b1',
        name: 'First SIG Joined',
        description: 'Enrolled in your first TCE Special Interest Group',
        icon: '🏆',
        sig_id: 'sig-ai',
        earned_at: '2025-07-01T10:00:00Z'
      },
      {
        id: 'b2',
        name: 'Active Learner',
        description: 'Participated in 3+ workshops and completed tasks on time',
        icon: '🚀',
        sig_id: 'sig-ai',
        earned_at: '2025-08-10T14:30:00Z'
      },
      {
        id: 'b3',
        name: 'Workshop Explorer',
        description: 'Successfully attended hands-on technical workshop series',
        icon: '💡',
        sig_id: 'sig-ds',
        earned_at: '2025-08-15T11:00:00Z'
      }
    ],
    notificationPreferences: {
      'sig-ai': { events: true, workshops: true, announcements: true, general: true },
      'sig-ds': { events: true, workshops: true, announcements: true, general: false }
    },
    created_at: '2025-07-01T08:00:00Z'
  },
  {
    id: 'user-student-b',
    name: 'Priya R.',
    email: 'priya.r@student.tce.edu',
    role: 'student',
    department: 'Information Technology',
    year: '2nd Year (Batch 2024-2028)',
    rollNo: '24IT088',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    skills: ['React', 'Figma', 'TailwindCSS', 'JavaScript', 'UI Design'],
    interests: ['Web Development', 'UI/UX', 'Cloud Computing', 'Frontend Architecture'],
    points: 290,
    badges: [
      {
        id: 'b1',
        name: 'First SIG Joined',
        description: 'Enrolled in your first TCE Special Interest Group',
        icon: '🏆',
        sig_id: 'sig-web',
        earned_at: '2025-07-02T10:00:00Z'
      },
      {
        id: 'b4',
        name: 'SIG Contributor',
        description: 'Submitted design system assets and completed sprint tasks',
        icon: '⭐',
        sig_id: 'sig-uiux',
        earned_at: '2025-08-12T16:00:00Z'
      }
    ],
    notificationPreferences: {
      'sig-web': { events: true, workshops: true, announcements: true, general: true },
      'sig-uiux': { events: true, workshops: true, announcements: true, general: true }
    },
    created_at: '2025-07-02T08:00:00Z'
  },
  {
    id: 'user-student-c',
    name: 'Anand M.',
    email: 'anand.m@student.tce.edu',
    role: 'student',
    department: 'Electronics & Communication Engineering',
    year: '4th Year (Batch 2022-2026)',
    rollNo: '22EC015',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    skills: ['Linux', 'Network Security', 'Cryptography', 'AWS', 'Docker', 'Bash'],
    interests: ['Cybersecurity', 'Cloud Computing', 'IoT', 'DevOps'],
    points: 440,
    badges: [
      {
        id: 'b1',
        name: 'First SIG Joined',
        description: 'Enrolled in your first TCE Special Interest Group',
        icon: '🏆',
        sig_id: 'sig-cyber',
        earned_at: '2025-07-01T10:00:00Z'
      },
      {
        id: 'b5',
        name: '5 Events Completed',
        description: 'Active attendance across 5 major events and lab sessions',
        icon: '🔥',
        sig_id: 'sig-cyber',
        earned_at: '2025-08-01T12:00:00Z'
      },
      {
        id: 'b6',
        name: 'Hackathon Participant',
        description: 'Represented TCE in external hackathon and CTF finals',
        icon: '🏅',
        sig_id: 'sig-cyber',
        earned_at: '2025-08-18T18:00:00Z'
      }
    ],
    notificationPreferences: {
      'sig-cyber': { events: true, workshops: true, announcements: true, general: true },
      'sig-cloud': { events: true, workshops: true, announcements: true, general: false }
    },
    created_at: '2025-07-01T09:00:00Z'
  },
  {
    id: 'user-student-d',
    name: 'Vaidha Varoghini',
    email: 'vaidhavaroghini@student.tce.edu',
    role: 'student',
    department: 'Computer Science & Engineering',
    year: '3rd Year (Batch 2023-2027)',
    rollNo: '23CS105',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    skills: ['C++', 'Python', 'Algorithms', 'Deep Learning', 'Embedded Systems'],
    interests: ['Artificial Intelligence', 'Competitive Programming', 'IoT', 'Robotics'],
    points: 520,
    badges: [
      {
        id: 'b1',
        name: 'First SIG Joined',
        description: 'Enrolled in your first TCE Special Interest Group',
        icon: '🏆',
        sig_id: 'sig-ai',
        earned_at: '2025-06-20T10:00:00Z'
      },
      {
        id: 'b2',
        name: 'Active Learner',
        description: 'Participated in 3+ workshops and completed tasks on time',
        icon: '🚀',
        sig_id: 'sig-cp',
        earned_at: '2025-07-15T14:30:00Z'
      },
      {
        id: 'b5',
        name: '5 Events Completed',
        description: 'Active attendance across 5 major events and lab sessions',
        icon: '🔥',
        sig_id: 'sig-ai',
        earned_at: '2025-08-05T12:00:00Z'
      },
      {
        id: 'b6',
        name: 'Hackathon Participant',
        description: 'Represented TCE in Smart India Hackathon',
        icon: '🏅',
        sig_id: 'sig-ai',
        earned_at: '2025-08-20T18:00:00Z'
      }
    ],
    notificationPreferences: {
      'sig-ai': { events: true, workshops: true, announcements: true, general: true },
      'sig-cp': { events: true, workshops: true, announcements: true, general: true },
      'sig-iot': { events: true, workshops: true, announcements: true, general: true }
    },
    created_at: '2025-06-20T08:00:00Z'
  },
  // Authority / Super Admin
  {
    id: 'user-auth-dean',
    name: 'Dr. M. Palaninatha Raja',
    email: 'sig.coordinator@tce.edu',
    role: 'authority',
    department: 'TCE Academic Deanery & Central SIG Oversight Directorate',
    year: 'Chief Coordinator & Dean',
    designation: 'Dean (Academic Process) & Central SIG Director',
    cabinLocation: 'Deanery Secretariat, Main Administrative Block',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    skills: ['Academic Administration', 'SIG Governance', 'Research Strategy', 'Curriculum Innovation'],
    interests: ['Autonomous System Accreditations', 'Interdisciplinary SIG Synergy'],
    points: 1000,
    badges: [],
    created_at: '2025-01-01T00:00:00Z'
  },
  // Teacher / Faculty Advisor 1: Dr. C. Deisy (CSE - AI & CP)
  {
    id: 'user-teacher-deisy',
    name: 'Dr. C. Deisy',
    email: 'dr.c.deisy@tce.edu',
    role: 'teacher',
    department: 'Department of Computer Science & Engineering',
    designation: 'Professor & Head of Department',
    cabinLocation: 'CSE Block Room 204',
    advisedSigIds: ['sig-ai', 'sig-cp'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    skills: ['Deep Learning', 'Algorithm Design', 'GenAI Research', 'Curriculum Design'],
    interests: ['Artificial Intelligence', 'Competitive Coding', 'Autonomous Agents'],
    points: 920,
    badges: [],
    created_at: '2025-01-10T00:00:00Z'
  },
  // Teacher / Faculty Advisor 2: Dr. R. A. Alaguraja (IT - Cyber & App)
  {
    id: 'user-teacher-alaguraja',
    name: 'Dr. R. A. Alaguraja',
    email: 'dr.r.alaguraja@tce.edu',
    role: 'teacher',
    department: 'Department of Information Technology',
    designation: 'Associate Professor & Information Security Lab Incharge',
    cabinLocation: 'IT Department Block Room 108',
    advisedSigIds: ['sig-cyber', 'sig-app'],
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
    skills: ['Network Security', 'Cryptography', 'Mobile Security', 'CTF Training'],
    interests: ['Cybersecurity', 'Zero Trust Architecture', 'Digital Forensics'],
    points: 880,
    badges: [],
    created_at: '2025-01-10T00:00:00Z'
  },
  // Teacher / Faculty Advisor 3: Dr. M. S. Balamurugan (ECE - IoT & VLSI)
  {
    id: 'user-teacher-balamurugan',
    name: 'Dr. M. S. Balamurugan',
    email: 'dr.m.balamurugan@tce.edu',
    role: 'teacher',
    department: 'Department of Electronics & Communication Engineering',
    designation: 'Professor & Cadence VLSI Research Centre Head',
    cabinLocation: 'ECE Department Block Room 312',
    advisedSigIds: ['sig-iot', 'sig-vlsi'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    skills: ['VLSI Design', 'Embedded Systems', 'ASIC Architecture', 'FPGA Prototyping'],
    interests: ['Semiconductor Technology', 'Edge AI Chips', 'Smart IoT'],
    points: 890,
    badges: [],
    created_at: '2025-01-12T00:00:00Z'
  },
  // Teacher / Faculty Advisor 4: Dr. G. Kumaraguruparan (Mech & MTR - Robotics, EV & 3D Print)
  {
    id: 'user-teacher-kumaraguruparan',
    name: 'Dr. G. Kumaraguruparan',
    email: 'dr.g.kumaraguruparan@tce.edu',
    role: 'teacher',
    department: 'Department of Mechanical & Mechatronics Engineering',
    designation: 'Associate Professor & Robotics Lab Lead',
    cabinLocation: 'Mechatronics Centre Room MTR-102',
    advisedSigIds: ['sig-robotics', 'sig-ev', 'sig-mech-cad'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    skills: ['Industrial Robotics', 'EV Powertrain', 'Additive Manufacturing', 'Kinematics'],
    interests: ['Autonomous Drones', 'Electric Vehicles', '3D Bioprinting'],
    points: 910,
    badges: [],
    created_at: '2025-01-15T00:00:00Z'
  },
  // Teacher / Faculty Advisor 5: Dr. S. Kavitha (Civil - Smart Structures & GIS)
  {
    id: 'user-teacher-kavitha',
    name: 'Dr. S. Kavitha',
    email: 'dr.s.kavitha@tce.edu',
    role: 'teacher',
    department: 'Department of Civil Engineering',
    designation: 'Associate Professor & GIS Survey Lab Head',
    cabinLocation: 'Civil Engineering Block Room CE-206',
    advisedSigIds: ['sig-civil-gis'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    skills: ['BIM Technology', 'GIS Mapping', 'Drone Photogrammetry', 'Structural Analysis'],
    interests: ['Smart City Infrastructure', 'Sustainable Construction', 'Satellite Remote Sensing'],
    points: 870,
    badges: [],
    created_at: '2025-01-18T00:00:00Z'
  },
  // Teacher / Faculty Advisor 6: Dr. K. Ramesh (EEE - Renewable & Microgrids)
  {
    id: 'user-teacher-ramesh',
    name: 'Dr. K. Ramesh',
    email: 'dr.k.ramesh@tce.edu',
    role: 'teacher',
    department: 'Department of Electrical & Electronics Engineering',
    designation: 'Professor & Power Systems In-charge',
    cabinLocation: 'EEE Department Block Room EE-115',
    advisedSigIds: ['sig-renewable', 'sig-ev'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    skills: ['Smart Microgrids', 'Power Electronics', 'Solar PV Modeling', 'Grid Automation'],
    interests: ['Green Energy Transition', 'Battery Storage Systems', 'High Voltage Engineering'],
    points: 900,
    badges: [],
    created_at: '2025-01-20T00:00:00Z'
  },
  // SIG Owner / Lead for AI
  {
    id: 'user-admin-ai',
    name: 'Vignesh K.',
    email: 'vignesh.lead@student.tce.edu',
    role: 'sig_owner',
    department: 'Computer Science and Engineering',
    year: '4th Year (Batch 2022-2026)',
    rollNo: '22CS091',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    skills: ['PyTorch', 'MLOps', 'Transformers', 'CUDA', 'Python'],
    interests: ['Artificial Intelligence', 'Large Language Models'],
    points: 850,
    badges: [],
    created_at: '2025-06-01T08:00:00Z'
  }
];

export const initialMemberships: Membership[] = [
  // Student A (Karthik S.): AI SIG + Data Science SIG
  { id: 'm-a-1', user_id: 'user-student-a', sig_id: 'sig-ai', role: 'member', status: 'active', joined_at: '2025-07-01T10:00:00Z' },
  { id: 'm-a-2', user_id: 'user-student-a', sig_id: 'sig-ds', role: 'member', status: 'active', joined_at: '2025-07-05T11:00:00Z' },

  // Student B (Priya R.): Web Development SIG + UI/UX SIG
  { id: 'm-b-1', user_id: 'user-student-b', sig_id: 'sig-web', role: 'member', status: 'active', joined_at: '2025-07-02T10:00:00Z' },
  { id: 'm-b-2', user_id: 'user-student-b', sig_id: 'sig-uiux', role: 'member', status: 'active', joined_at: '2025-07-08T12:00:00Z' },

  // Student C (Anand M.): Cybersecurity SIG + Cloud Computing SIG
  { id: 'm-c-1', user_id: 'user-student-c', sig_id: 'sig-cyber', role: 'member', status: 'active', joined_at: '2025-07-01T10:00:00Z' },
  { id: 'm-c-2', user_id: 'user-student-c', sig_id: 'sig-cloud', role: 'member', status: 'active', joined_at: '2025-07-04T14:00:00Z' },

  // Student D (Vaidha Varoghini): AI SIG + Competitive Programming SIG + IoT SIG + Robotics SIG (joined 4 SIGs freely!)
  { id: 'm-d-1', user_id: 'user-student-d', sig_id: 'sig-ai', role: 'member', status: 'active', joined_at: '2025-06-20T10:00:00Z' },
  { id: 'm-d-2', user_id: 'user-student-d', sig_id: 'sig-cp', role: 'member', status: 'active', joined_at: '2025-06-22T12:00:00Z' },
  { id: 'm-d-3', user_id: 'user-student-d', sig_id: 'sig-iot', role: 'member', status: 'active', joined_at: '2025-06-25T15:00:00Z' },
  { id: 'm-d-4', user_id: 'user-student-d', sig_id: 'sig-robotics', role: 'member', status: 'active', joined_at: '2025-07-01T09:00:00Z' },

  // Teachers as Faculty Advisors & Owners
  { id: 'm-teach-deisy-ai', user_id: 'user-teacher-deisy', sig_id: 'sig-ai', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-teach-deisy-cp', user_id: 'user-teacher-deisy', sig_id: 'sig-cp', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-teach-ala-cyber', user_id: 'user-teacher-alaguraja', sig_id: 'sig-cyber', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-teach-ala-app', user_id: 'user-teacher-alaguraja', sig_id: 'sig-app', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-teach-bala-iot', user_id: 'user-teacher-balamurugan', sig_id: 'sig-iot', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-teach-bala-vlsi', user_id: 'user-teacher-balamurugan', sig_id: 'sig-vlsi', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-teach-kuma-rob', user_id: 'user-teacher-kumaraguruparan', sig_id: 'sig-robotics', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-teach-kuma-ev', user_id: 'user-teacher-kumaraguruparan', sig_id: 'sig-ev', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-teach-kav-civil', user_id: 'user-teacher-kavitha', sig_id: 'sig-civil-gis', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-teach-ram-renew', user_id: 'user-teacher-ramesh', sig_id: 'sig-renewable', role: 'sig_owner', status: 'active', joined_at: '2025-06-15T09:00:00Z' },

  // Student Leads
  { id: 'm-ai-owner', user_id: 'user-admin-ai', sig_id: 'sig-ai', role: 'sig_admin', status: 'active', joined_at: '2025-06-15T09:00:00Z' },
  { id: 'm-cyber-owner', user_id: 'user-student-c', sig_id: 'sig-cyber', role: 'sig_admin', status: 'active', joined_at: '2025-06-18T10:00:00Z' },
  { id: 'm-web-owner', user_id: 'user-student-b', sig_id: 'sig-web', role: 'sig_owner', status: 'active', joined_at: '2025-06-20T08:30:00Z' },
  { id: 'm-ds-owner', user_id: 'user-student-a', sig_id: 'sig-ds', role: 'sig_owner', status: 'active', joined_at: '2025-06-22T11:00:00Z' },
  { id: 'm-cp-owner', user_id: 'user-student-d', sig_id: 'sig-cp', role: 'sig_admin', status: 'active', joined_at: '2025-07-01T08:00:00Z' }
];

export const initialActivities: Activity[] = [
  // AI SIG Activities
  {
    id: 'act-ai-1',
    sig_id: 'sig-ai',
    title: 'Hands-on Generative AI & Retrieval-Augmented Generation (RAG) Workshop',
    description: 'Deep dive into building local RAG pipelines using LangChain, ChromaDB, and open-weight Llama-3 models. Includes practical hands-on notebook sessions in TCE High-Performance Lab.',
    category: 'workshop',
    date: '2026-09-02',
    time: '4:45 PM - 6:30 PM',
    venue: 'TCE Advanced Computing Center Lab 3',
    isOnline: false,
    organizer: 'Vignesh K. (AI SIG Lead)',
    registrationDeadline: '2026-09-01T23:59:00Z',
    maxParticipants: 45,
    registeredCount: 32,
    status: 'upcoming',
    creator_id: 'user-admin-ai',
    created_at: '2026-08-20T10:00:00Z',
    registeredUserIds: ['user-student-a', 'user-student-d']
  },
  {
    id: 'act-ai-2',
    sig_id: 'sig-ai',
    title: 'TCE VisionHack: Computer Vision for Edge Autonomous Robotics',
    description: '48-Hour intensive hackathon focused on developing low-latency YOLOv8 object detection pipelines on NVIDIA Jetson nano hardware.',
    category: 'hackathon',
    date: '2026-09-12',
    time: '9:00 AM (48 Hours)',
    venue: 'TCE Central Auditorium & CSE Lab',
    isOnline: false,
    organizer: 'AI SIG Core Team in collaboration with Robotics SIG',
    registrationDeadline: '2026-09-10T18:00:00Z',
    maxParticipants: 50,
    registeredCount: 40,
    status: 'upcoming',
    creator_id: 'user-admin-ai',
    created_at: '2026-08-22T14:00:00Z',
    registeredUserIds: ['user-student-a']
  },
  {
    id: 'act-ai-3',
    sig_id: 'sig-ai',
    title: 'Deep Learning with PyTorch: From Tensors to Custom CNNs',
    description: 'Foundational boot camp covering autograd, tensor operations, backpropagation, and training CIFAR-10 classifiers with PyTorch Lightning.',
    category: 'bootcamp',
    date: '2026-08-15',
    time: '4:45 PM - 6:30 PM',
    venue: 'CSE Seminar Hall',
    isOnline: false,
    organizer: 'Dr. C. Deisy & AI SIG Mentors',
    registrationDeadline: '2026-08-14T18:00:00Z',
    maxParticipants: 50,
    registeredCount: 48,
    status: 'completed',
    creator_id: 'user-admin-ai',
    created_at: '2026-08-01T09:00:00Z',
    registeredUserIds: ['user-student-a', 'user-student-d']
  },

  // Cybersecurity SIG Activities
  {
    id: 'act-cyber-1',
    sig_id: 'sig-cyber',
    title: 'TCE Annual Intra-Campus CTF Championship (Capture The Flag)',
    description: 'Live competitive hacking challenge covering Web Exploitation, Binary Analysis, Cryptography, Reverse Engineering, and Network Forensics.',
    category: 'hackathon',
    date: '2026-09-05',
    time: '10:00 AM - 6:00 PM',
    venue: 'Information Security Lab (IT Block Room 204)',
    isOnline: true,
    meetingLink: 'https://ctf.tce.edu/portal',
    organizer: 'TCE Infosec Team',
    registrationDeadline: '2026-09-04T20:00:00Z',
    maxParticipants: 40,
    registeredCount: 26,
    status: 'upcoming',
    creator_id: 'user-student-c',
    created_at: '2026-08-21T11:00:00Z',
    registeredUserIds: ['user-student-c']
  },
  {
    id: 'act-cyber-2',
    sig_id: 'sig-cyber',
    title: 'Web Application Security & OWASP Top 10 Hands-on Lab',
    description: 'Practical walkthrough simulating SQL Injections, Cross-Site Scripting (XSS), CSRF, and Broken Access Controls using vulnerable DVWA and JuiceShop targets.',
    category: 'workshop',
    date: '2026-09-18',
    time: '4:45 PM - 6:30 PM',
    venue: 'IT Seminar Hall',
    isOnline: false,
    organizer: 'Anand M. & Dr. R. A. Alaguraja',
    registrationDeadline: '2026-09-17T18:00:00Z',
    maxParticipants: 40,
    registeredCount: 22,
    status: 'upcoming',
    creator_id: 'user-student-c',
    created_at: '2026-08-23T15:00:00Z',
    registeredUserIds: ['user-student-c']
  },

  // Web Dev SIG Activities
  {
    id: 'act-web-1',
    sig_id: 'sig-web',
    title: 'Full-Stack Next.js 15 & Server Actions Masterclass',
    description: 'Building end-to-end type-safe enterprise applications with React 19, Server Components, Drizzle ORM, and TailwindCSS.',
    category: 'workshop',
    date: '2026-09-08',
    time: '4:45 PM - 6:30 PM',
    venue: 'Software Systems Lab (Main Building 118)',
    isOnline: false,
    organizer: 'Harish Babu (Web SIG Lead)',
    registrationDeadline: '2026-09-07T23:59:00Z',
    maxParticipants: 45,
    registeredCount: 38,
    status: 'upcoming',
    creator_id: 'user-student-b',
    created_at: '2026-08-22T08:00:00Z',
    registeredUserIds: ['user-student-b']
  },

  // Data Science SIG Activities
  {
    id: 'act-ds-1',
    sig_id: 'sig-ds',
    title: 'Large-Scale Distributed Analytics with PySpark & Cloud Storage',
    description: 'Processing multi-gigabyte financial transaction logs with distributed Spark RDDs and DataFrames on Google Cloud Dataproc clusters.',
    category: 'workshop',
    date: '2026-09-15',
    time: '4:45 PM - 6:30 PM',
    venue: 'Data Science Lab 2',
    isOnline: false,
    organizer: 'Ananya S. & Karthik S.',
    registrationDeadline: '2026-09-14T20:00:00Z',
    maxParticipants: 35,
    registeredCount: 29,
    status: 'upcoming',
    creator_id: 'user-student-a',
    created_at: '2026-08-24T10:00:00Z',
    registeredUserIds: ['user-student-a']
  },

  // Competitive Programming Activities
  {
    id: 'act-cp-1',
    sig_id: 'sig-cp',
    title: 'TCE Weekly CodeSprint #48: Dynamic Programming & Bitmasking',
    description: '2-hour timed contest on HackerEarth followed by in-person editorial walkthrough by ACM-ICPC regionalists.',
    category: 'hands-on',
    date: '2026-09-03',
    time: '5:00 PM - 7:00 PM',
    venue: 'CSE Block Room 102 & Online Portal',
    isOnline: true,
    meetingLink: 'https://contest.tce.edu/sprint48',
    organizer: 'Siddharth M. & Vaidha Varoghini',
    registrationDeadline: '2026-09-03T16:30:00Z',
    maxParticipants: 50,
    registeredCount: 44,
    status: 'upcoming',
    creator_id: 'user-student-d',
    created_at: '2026-08-25T11:00:00Z',
    registeredUserIds: ['user-student-d']
  }
];

export const initialTasks: Task[] = [
  // AI SIG Tasks
  {
    id: 'task-ai-1',
    sig_id: 'sig-ai',
    title: 'Implement Multi-Query Vector Retrieval in Campus Chatbot',
    description: 'Enhance the RAG pipeline by generating 3 perspective sub-queries before embedding search to boost retrieval recall on TCE regulation PDFs.',
    deadline: '2026-09-10',
    priority: 'high',
    status: 'in_progress',
    assignedToUserIds: ['user-student-a', 'user-student-d'],
    assignedToNames: ['Karthik S.', 'Vaidha Varoghini'],
    progressPercent: 65,
    creator_id: 'user-admin-ai',
    created_at: '2026-08-20T10:00:00Z',
    pointsReward: 75
  },
  {
    id: 'task-ai-2',
    sig_id: 'sig-ai',
    title: 'Annotate TCE Campus Botanical Herbarium Dataset for Plant YOLO',
    description: 'Label 500 bounding box annotations for native medicinal plant species on TCE campus using Roboflow tool for the green-campus AI research initiative.',
    deadline: '2026-09-18',
    priority: 'medium',
    status: 'not_started',
    assignedToUserIds: ['user-student-a'],
    assignedToNames: ['Karthik S.'],
    progressPercent: 0,
    creator_id: 'user-admin-ai',
    created_at: '2026-08-22T14:00:00Z',
    pointsReward: 50
  },
  {
    id: 'task-ai-3',
    sig_id: 'sig-ai',
    title: 'Quantize Mistral-7B to 4-bit GGUF for Local Lab Deployment',
    description: 'Convert and test perplexity scores on 4-bit AWQ / GGUF quantized models to run inference on lab workstations with 8GB VRAM.',
    deadline: '2026-08-28',
    priority: 'urgent',
    status: 'completed',
    assignedToUserIds: ['user-student-d'],
    assignedToNames: ['Vaidha Varoghini'],
    progressPercent: 100,
    creator_id: 'user-admin-ai',
    created_at: '2026-08-15T09:00:00Z',
    pointsReward: 100
  },

  // Cybersecurity SIG Tasks
  {
    id: 'task-cyber-1',
    sig_id: 'sig-cyber',
    title: 'Create 5 Web Exploitation Challenge Containers for CTF',
    description: 'Author challenge source codes with realistic vulnerabilities (JWT secret bypass, prototype pollution, blind SSRF) and dockerize them.',
    deadline: '2026-09-04',
    priority: 'urgent',
    status: 'in_progress',
    assignedToUserIds: ['user-student-c'],
    assignedToNames: ['Anand M.'],
    progressPercent: 80,
    creator_id: 'user-student-c',
    created_at: '2026-08-21T11:00:00Z',
    pointsReward: 90
  },
  {
    id: 'task-cyber-2',
    sig_id: 'sig-cyber',
    title: 'Audit Student Club Subdomains for SSL/TLS Misconfigurations',
    description: 'Run automated SSL scans (testssl.sh) and document cipher suites, HSTS status, and report security headers.',
    deadline: '2026-09-20',
    priority: 'medium',
    status: 'not_started',
    assignedToUserIds: ['user-student-c'],
    assignedToNames: ['Anand M.'],
    progressPercent: 0,
    creator_id: 'user-student-c',
    created_at: '2026-08-24T16:00:00Z',
    pointsReward: 60
  },

  // Web Dev SIG Tasks
  {
    id: 'task-web-1',
    sig_id: 'sig-web',
    title: 'Migrate Club Event Registration Backend to Node 22 ESM',
    description: 'Refactor CommonJS exports, optimize async route handlers, and configure vitest unit test coverage.',
    deadline: '2026-09-12',
    priority: 'medium',
    status: 'in_progress',
    assignedToUserIds: ['user-student-b'],
    assignedToNames: ['Priya R.'],
    progressPercent: 40,
    creator_id: 'user-student-b',
    created_at: '2026-08-22T08:00:00Z',
    pointsReward: 60
  },

  // Competitive Programming Tasks
  {
    id: 'task-cp-1',
    sig_id: 'sig-cp',
    title: 'Prepare Editorial & Test Cases for Range Query Problem Set',
    description: 'Write problem statements, generator scripts, and solution validators for Segment Tree and Fenwick Tree problem pack.',
    deadline: '2026-09-02',
    priority: 'high',
    status: 'in_progress',
    assignedToUserIds: ['user-student-d'],
    assignedToNames: ['Vaidha Varoghini'],
    progressPercent: 90,
    creator_id: 'user-student-d',
    created_at: '2026-08-25T11:00:00Z',
    pointsReward: 70
  }
];

export const initialNotifications: Notification[] = [
  // AI SIG Notifications
  {
    id: 'notif-ai-1',
    sig_id: 'sig-ai',
    sig_name: 'Artificial Intelligence & Machine Learning SIG',
    title: 'AI Workshop: Hands-on Generative AI & RAG Registration is Open',
    message: 'Registrations are now open for the upcoming Generative AI & RAG hands-on workshop scheduled for Sept 2 in ACC Lab 3. Limited to 45 seats.',
    priority: 'important',
    category: 'workshops',
    created_by: 'user-admin-ai',
    created_by_name: 'Vignesh K. (AI SIG Lead)',
    created_at: '2026-08-24T10:00:00Z'
  },
  {
    id: 'notif-ai-2',
    sig_id: 'sig-ai',
    sig_name: 'Artificial Intelligence & Machine Learning SIG',
    title: 'TCE VisionHack 2026 Team Registrations Open',
    message: 'Form your 3-member teams for the 48-Hour VisionHack on edge robotics. Cash prizes worth Rs. 50,000 + industry internships.',
    priority: 'urgent',
    category: 'events',
    created_by: 'user-admin-ai',
    created_by_name: 'Vignesh K. (AI SIG Lead)',
    created_at: '2026-08-25T14:30:00Z'
  },
  {
    id: 'notif-ai-3',
    sig_id: 'sig-ai',
    sig_name: 'Artificial Intelligence & Machine Learning SIG',
    title: 'Weekly Paper Reading Circle: Attention Is All You Need',
    message: 'Join us this Wednesday at 5 PM in CSE-302 for our weekly architecture review session on Transformer multi-head attention math.',
    priority: 'normal',
    category: 'announcements',
    created_by: 'user-admin-ai',
    created_by_name: 'Vignesh K. (AI SIG Lead)',
    created_at: '2026-08-26T08:00:00Z'
  },

  // Cybersecurity SIG Notifications
  {
    id: 'notif-cyber-1',
    sig_id: 'sig-cyber',
    sig_name: 'Cybersecurity & Ethical Hacking SIG',
    title: 'TCE Intra-College CTF Championship Starts This Saturday!',
    message: 'All registered participants must ensure access to the campus intranet portal. VPN configurations have been sent to member emails.',
    priority: 'urgent',
    category: 'events',
    created_by: 'user-student-c',
    created_by_name: 'Kavitha M. (Lead)',
    created_at: '2026-08-24T18:00:00Z'
  },
  {
    id: 'notif-cyber-2',
    sig_id: 'sig-cyber',
    sig_name: 'Cybersecurity & Ethical Hacking SIG',
    title: 'New Lab Environment: Vulnerable Active Directory Forest Released',
    message: 'Check out the new AD lab VM on the TCE Cyber Range servers to practice Kerberoasting and Pass-the-Hash attacks.',
    priority: 'normal',
    category: 'general',
    created_by: 'user-student-c',
    created_by_name: 'Kavitha M. (Lead)',
    created_at: '2026-08-25T11:00:00Z'
  },

  // Web Dev SIG Notifications
  {
    id: 'notif-web-1',
    sig_id: 'sig-web',
    sig_name: 'Web & Cloud Development SIG',
    title: 'HackTCE 2026 Registration & Project Mentor Allocations',
    message: 'Hackathon registration portal is now live. Web SIG members will receive priority mentorship from alumni tech leads.',
    priority: 'important',
    category: 'events',
    created_by: 'user-student-b',
    created_by_name: 'Harish Babu (Web Lead)',
    created_at: '2026-08-23T09:00:00Z'
  },

  // Data Science SIG Notifications
  {
    id: 'notif-ds-1',
    sig_id: 'sig-ds',
    sig_name: 'Data Science & Big Data Analytics SIG',
    title: 'Kaggle Student Competition Kickoff: Tamil Nadu Rainfall Prediction',
    message: 'Download the starter notebook from the SIG Resource Hub. Top 3 predictors win exclusive cloud computing credits.',
    priority: 'important',
    category: 'events',
    created_by: 'user-student-a',
    created_by_name: 'Ananya S. (DS Lead)',
    created_at: '2026-08-24T15:00:00Z'
  },

  // Competitive Programming SIG Notifications
  {
    id: 'notif-cp-1',
    sig_id: 'sig-cp',
    sig_name: 'Competitive Programming & Algorithms SIG',
    title: 'CodeSprint #48 Problem Editorial Available',
    message: 'The mathematical breakdown for Problem E (Expected Value with Tree DP) is now live in the Resource Hub.',
    priority: 'normal',
    category: 'announcements',
    created_by: 'user-student-d',
    created_by_name: 'Siddharth M. (CP Lead)',
    created_at: '2026-08-25T20:00:00Z'
  }
];

export const initialResources: SIGResource[] = [
  // AI SIG Resources
  {
    id: 'res-ai-1',
    sig_id: 'sig-ai',
    title: 'TCE GenAI Handbook & PyTorch Cheatsheet (v2.4)',
    description: 'Comprehensive 40-page guide with PyTorch Lightning templates, fine-tuning scripts, and hyperparameter tuning best practices.',
    type: 'pdf',
    url: 'https://resources.tce.edu/sigs/ai/pytorch-handbook-2026.pdf',
    size: '4.8 MB',
    uploaded_by: 'Vignesh K.',
    uploaded_at: '2026-08-15T10:00:00Z'
  },
  {
    id: 'res-ai-2',
    sig_id: 'sig-ai',
    title: 'Official TCE RAG Chatbot Starter Repository',
    description: 'Modular LangChain and FastEmbed codebase with Docker compose scripts for immediate local deployment.',
    type: 'repo',
    url: 'https://github.com/tce-sigs/ai-rag-starter',
    uploaded_by: 'Vignesh K.',
    uploaded_at: '2026-08-18T14:00:00Z'
  },
  {
    id: 'res-ai-3',
    sig_id: 'sig-ai',
    title: 'Video Lecture: Mathematical Foundations of Attention & FlashAttention-2',
    description: 'Recorded guest lecture by TCE Alumnus & Senior AI Researcher at Google DeepMind.',
    type: 'video',
    url: 'https://mediasite.tce.edu/lectures/ai-flash-attention',
    uploaded_by: 'Dr. C. Deisy',
    uploaded_at: '2026-08-10T16:00:00Z'
  },

  // Cybersecurity SIG Resources
  {
    id: 'res-cyber-1',
    sig_id: 'sig-cyber',
    title: 'TCE CTF Field Manual: Web & Binary Exploitation Methodology',
    description: 'Battle-tested checklists, payload lists, and cheat sheets for solving CTF challenges swiftly.',
    type: 'pdf',
    url: 'https://resources.tce.edu/sigs/cyber/ctf-field-manual.pdf',
    size: '6.2 MB',
    uploaded_by: 'Kavitha M.',
    uploaded_at: '2026-08-12T11:00:00Z'
  },
  {
    id: 'res-cyber-2',
    sig_id: 'sig-cyber',
    title: 'Ghidra Reverse Engineering & Binary Decompilation Walkthrough',
    description: 'Step-by-step interactive tutorial for decompiling x86_64 ELF binaries and bypassing license key checks.',
    type: 'tutorial',
    url: 'https://infosec.tce.edu/tutorials/ghidra-decompilation',
    uploaded_by: 'Anand M.',
    uploaded_at: '2026-08-16T15:00:00Z'
  },

  // Web Dev SIG Resources
  {
    id: 'res-web-1',
    sig_id: 'sig-web',
    title: 'Next.js 15 Full-Stack Production Architecture Guide',
    description: 'Folder conventions, server actions error handling, and Prisma/Drizzle connection pooling patterns.',
    type: 'pdf',
    url: 'https://resources.tce.edu/sigs/web/nextjs15-architecture.pdf',
    size: '3.1 MB',
    uploaded_by: 'Harish Babu',
    uploaded_at: '2026-08-14T09:00:00Z'
  },

  // Data Science Resources
  {
    id: 'res-ds-1',
    sig_id: 'sig-ds',
    title: 'PySpark & Pandas 2.0 High-Performance Query Optimization',
    description: 'Vectorized operations, parquet file partitioning, and Spark catalyst optimizer tuning notes.',
    type: 'cheatsheet',
    url: 'https://resources.tce.edu/sigs/ds/spark-optimization-notes.pdf',
    size: '2.4 MB',
    uploaded_by: 'Ananya S.',
    uploaded_at: '2026-08-19T12:00:00Z'
  }
];

class DatabaseManager {
  private state: DatabaseState;

  constructor() {
    this.state = {
      users: JSON.parse(JSON.stringify(initialUsers)),
      sigs: JSON.parse(JSON.stringify(initialSigs)),
      memberships: JSON.parse(JSON.stringify(initialMemberships)),
      activities: JSON.parse(JSON.stringify(initialActivities)),
      tasks: JSON.parse(JSON.stringify(initialTasks)),
      notifications: JSON.parse(JSON.stringify(initialNotifications)),
      resources: JSON.parse(JSON.stringify(initialResources)),
      userReadNotificationIds: {
        'user-student-a': ['notif-ai-3'],
        'user-student-b': [],
        'user-student-c': ['notif-cyber-2'],
        'user-student-d': ['notif-ai-3']
      },
      userPasswords: {
        'user-student-d': 'vaidha@tce2026',
        'user-teacher-deisy': 'deisy@tce2026',
        'user-authority-palani': 'dean@tce2026'
      },
      userHasSetPassword: {
        'user-student-d': true,
        'user-teacher-deisy': true,
        'user-authority-palani': true
      },
      resetOtps: {}
    };
  }

  // Password & Security Management
  hasUserSetPassword(userId: string): boolean {
    return !!this.state.userHasSetPassword[userId];
  }

  verifyPassword(userId: string, inputPassword?: string): boolean {
    // If user has not set a password yet, we consider any input valid for initial login / setup
    if (!this.state.userHasSetPassword[userId]) {
      return true;
    }
    const stored = this.state.userPasswords[userId];
    if (!stored) return true;
    if (!inputPassword) return false;
    return stored === inputPassword.trim();
  }

  setPassword(userId: string, newPassword: string): void {
    this.state.userPasswords[userId] = newPassword.trim();
    this.state.userHasSetPassword[userId] = true;
  }

  createPasswordResetOtp(email: string): { otp: string; email: string } | null {
    const user = this.getUserByEmail(email);
    if (!user) return null;

    // Generate clean 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const cleanEmail = email.toLowerCase().trim();

    // Valid for 15 minutes
    this.state.resetOtps[cleanEmail] = {
      otp,
      expiresAt: Date.now() + 15 * 60 * 1000
    };

    return { otp, email: user.email };
  }

  verifyPasswordResetOtp(email: string, otp: string): boolean {
    const cleanEmail = email.toLowerCase().trim();
    const record = this.state.resetOtps[cleanEmail];
    if (!record) return false;
    if (Date.now() > record.expiresAt) {
      delete this.state.resetOtps[cleanEmail];
      return false;
    }
    return record.otp.trim() === otp.trim();
  }

  resetPasswordWithOtp(email: string, otp: string, newPassword: string): boolean {
    if (!this.verifyPasswordResetOtp(email, otp)) {
      return false;
    }
    const user = this.getUserByEmail(email);
    if (!user) return false;

    this.setPassword(user.id, newPassword);
    delete this.state.resetOtps[email.toLowerCase().trim()];
    return true;
  }

  // Getters & Lookups
  getUserById(id: string): User | undefined {
    return this.state.users.find(u => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    const clean = email.toLowerCase().trim();
    // Direct match
    const direct = this.state.users.find(u => u.email.toLowerCase() === clean);
    if (direct) return direct;

    // Faculty aliases
    if (clean === 'cdeisy@tce.edu' || clean === 'deisy@tce.edu' || clean.includes('deisy')) {
      return this.state.users.find(u => u.id === 'user-teacher-deisy');
    }
    if (clean === 'alaguraja@tce.edu' || clean.includes('alaguraja')) {
      return this.state.users.find(u => u.id === 'user-teacher-alaguraja');
    }
    if (clean === 'balamurugan@tce.edu' || clean.includes('balamurugan')) {
      return this.state.users.find(u => u.id === 'user-teacher-balamurugan');
    }
    if (clean === 'ramesh@tce.edu' || clean.includes('ramesh')) {
      return this.state.users.find(u => u.id === 'user-teacher-ramesh');
    }
    if (clean === 'kumaraguruparan@tce.edu' || clean.includes('kumaraguruparan')) {
      return this.state.users.find(u => u.id === 'user-teacher-kumaraguruparan');
    }
    if (clean === 'kavitha@tce.edu' || clean.includes('kavitha')) {
      return this.state.users.find(u => u.id === 'user-teacher-kavitha');
    }

    // Student aliases
    if (clean.includes('vaidha') || clean.includes('23cs105')) {
      return this.state.users.find(u => u.id === 'user-student-d');
    }
    if (clean.includes('karthik') || clean.includes('23cs042')) {
      return this.state.users.find(u => u.id === 'user-student-a');
    }
    if (clean.includes('priya') || clean.includes('24it088')) {
      return this.state.users.find(u => u.id === 'user-student-b');
    }

    return undefined;
  }

  getAllUsers(): User[] {
    return this.state.users;
  }

  getAllSigs(): SIG[] {
    return this.state.sigs;
  }

  getSigById(id: string): SIG | undefined {
    return this.state.sigs.find(s => s.id === id);
  }

  // Memberships
  getUserMemberships(userId: string): Membership[] {
    return this.state.memberships.filter(m => m.user_id === userId && m.status === 'active');
  }

  getSigMemberships(sigId: string): Membership[] {
    return this.state.memberships.filter(m => m.sig_id === sigId && m.status === 'active');
  }

  isUserMemberOfSig(userId: string, sigId: string): boolean {
    return this.state.memberships.some(m => m.user_id === userId && m.sig_id === sigId && m.status === 'active');
  }

  getUserRoleInSig(userId: string, sigId: string): 'member' | 'sig_admin' | 'sig_owner' | null {
    const membership = this.state.memberships.find(m => m.user_id === userId && m.sig_id === sigId && m.status === 'active');
    return membership ? membership.role : null;
  }

  // Constraints & Membership modifications
  joinSig(userId: string, sigId: string): { success: boolean; message: string; membership?: Membership } {
    const user = this.getUserById(userId);
    const sig = this.getSigById(sigId);

    if (!user || !sig) {
      return { success: false, message: 'User or SIG not found.' };
    }

    // Check if already member
    const existing = this.state.memberships.find(m => m.user_id === userId && m.sig_id === sigId);
    if (existing && existing.status === 'active') {
      return { success: false, message: 'You are already an active member of this SIG.' };
    }

    // Constraint 5: Maximum 50 members
    const currentMembers = this.getSigMemberships(sigId);
    if (currentMembers.length >= sig.max_members) {
      return { success: false, message: 'This SIG has reached its maximum capacity of 50 members.' };
    }

    // If existing pending/inactive, activate
    if (existing) {
      existing.status = 'active';
      existing.joined_at = new Date().toISOString();
      sig.member_count = this.getSigMemberships(sigId).length;
      return { success: true, message: `Successfully rejoined ${sig.name}!`, membership: existing };
    }

    // Create new membership
    const newMembership: Membership = {
      id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      user_id: userId,
      sig_id: sigId,
      role: 'member',
      status: 'active',
      joined_at: new Date().toISOString()
    };

    this.state.memberships.push(newMembership);
    sig.member_count = this.getSigMemberships(sigId).length;

    // Award First SIG Joined badge if this is user's first SIG
    const allUserMemberships = this.getUserMemberships(userId);
    if (allUserMemberships.length === 1 && !user.badges.some(b => b.name === 'First SIG Joined')) {
      user.badges.push({
        id: `badge-${Date.now()}`,
        name: 'First SIG Joined',
        description: 'Enrolled in your first TCE Special Interest Group',
        icon: '🏆',
        sig_id: sigId,
        earned_at: new Date().toISOString()
      });
      user.points += 50;
    }

    return { success: true, message: `Welcome to ${sig.name}!`, membership: newMembership };
  }

  leaveSig(userId: string, sigId: string): { success: boolean; message: string } {
    const userRole = this.getUserRoleInSig(userId, sigId);
    if (!userRole) {
      return { success: false, message: 'You are not a member of this SIG.' };
    }

    // Constraint 3: Always maintain an Owner
    if (userRole === 'sig_owner') {
      const allOwners = this.state.memberships.filter(m => m.sig_id === sigId && m.role === 'sig_owner' && m.status === 'active');
      if (allOwners.length <= 1) {
        return {
          success: false,
          message: 'This action cannot be completed because every SIG must have at least one Owner.'
        };
      }
    }

    // Remove membership
    const index = this.state.memberships.findIndex(m => m.user_id === userId && m.sig_id === sigId);
    if (index !== -1) {
      this.state.memberships.splice(index, 1);
      const sig = this.getSigById(sigId);
      if (sig) {
        sig.member_count = this.getSigMemberships(sigId).length;
      }
      return { success: true, message: 'Successfully left the SIG.' };
    }

    return { success: false, message: 'Membership record not found.' };
  }

  updateMemberRole(requesterId: string, sigId: string, targetUserId: string, newRole: 'member' | 'sig_admin' | 'sig_owner'): { success: boolean; message: string } {
    const requesterRole = this.getUserRoleInSig(requesterId, sigId);
    const requesterUser = this.getUserById(requesterId);
    const isSuperAdmin = requesterUser?.role === 'authority';

    if (!isSuperAdmin && requesterRole !== 'sig_owner') {
      return { success: false, message: 'Only SIG Owners or Authorities can update member roles.' };
    }

    const targetMembership = this.state.memberships.find(m => m.user_id === targetUserId && m.sig_id === sigId && m.status === 'active');
    if (!targetMembership) {
      return { success: false, message: 'Target member not found in this SIG.' };
    }

    // Constraint 3: If demoting an owner, verify another owner exists
    if (targetMembership.role === 'sig_owner' && newRole !== 'sig_owner') {
      const owners = this.state.memberships.filter(m => m.sig_id === sigId && m.role === 'sig_owner' && m.status === 'active');
      if (owners.length <= 1) {
        return {
          success: false,
          message: 'This action cannot be completed because every SIG must have at least one Owner.'
        };
      }
    }

    targetMembership.role = newRole;
    return { success: true, message: `Member role successfully updated to ${newRole}.` };
  }

  removeMember(requesterId: string, sigId: string, targetUserId: string): { success: boolean; message: string } {
    const requesterRole = this.getUserRoleInSig(requesterId, sigId);
    const requesterUser = this.getUserById(requesterId);
    const isSuperAdmin = requesterUser?.role === 'authority';

    // Constraint 2: Only SIG Owner/Admin or SuperAdmin can remove members
    if (!isSuperAdmin && requesterRole !== 'sig_owner' && requesterRole !== 'sig_admin') {
      return { success: false, message: 'Permission denied: Only SIG Owners or Admins can remove members.' };
    }

    const targetMembership = this.state.memberships.find(m => m.user_id === targetUserId && m.sig_id === sigId && m.status === 'active');
    if (!targetMembership) {
      return { success: false, message: 'Target member not found in this SIG.' };
    }

    // Constraint 3: Cannot remove last owner
    if (targetMembership.role === 'sig_owner') {
      const owners = this.state.memberships.filter(m => m.sig_id === sigId && m.role === 'sig_owner' && m.status === 'active');
      if (owners.length <= 1) {
        return {
          success: false,
          message: 'This action cannot be completed because every SIG must have at least one Owner.'
        };
      }
    }

    const index = this.state.memberships.findIndex(m => m.user_id === targetUserId && m.sig_id === sigId);
    if (index !== -1) {
      this.state.memberships.splice(index, 1);
      const sig = this.getSigById(sigId);
      if (sig) {
        sig.member_count = this.getSigMemberships(sigId).length;
      }
      return { success: true, message: 'Member successfully removed.' };
    }

    return { success: false, message: 'Membership record not found.' };
  }

  // Tenant-Scoped Activities
  getSigActivities(sigId: string): Activity[] {
    return this.state.activities.filter(a => a.sig_id === sigId);
  }

  createActivity(userId: string, sigId: string, activityData: Partial<Activity>): { success: boolean; message: string; activity?: Activity } {
    const userRole = this.getUserRoleInSig(userId, sigId);
    const user = this.getUserById(userId);
    const isSuperAdmin = user?.role === 'authority';

    // Constraint 2: Only SIG Owner/Admin or Authority can create activities
    if (!isSuperAdmin && userRole !== 'sig_owner' && userRole !== 'sig_admin') {
      return { success: false, message: 'Permission denied: Only SIG Owners or Admins can create activities.' };
    }

    // Constraint 6: Activity creation blocked if SIG has no members besides the creator
    const members = this.getSigMemberships(sigId);
    const otherMembers = members.filter(m => m.user_id !== userId);
    if (otherMembers.length === 0) {
      return {
        success: false,
        message: 'At least one additional SIG member is required before creating an activity or task.'
      };
    }

    const newActivity: Activity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sig_id: sigId,
      title: activityData.title || 'Untitled SIG Activity',
      description: activityData.description || '',
      category: activityData.category || 'workshop',
      date: activityData.date || new Date().toISOString().split('T')[0],
      time: activityData.time || '4:45 PM - 6:30 PM',
      venue: activityData.venue || 'TCE Campus',
      isOnline: Boolean(activityData.isOnline),
      meetingLink: activityData.meetingLink,
      organizer: activityData.organizer || user?.name || 'SIG Lead',
      registrationDeadline: activityData.registrationDeadline || new Date(Date.now() + 7 * 86400000).toISOString(),
      maxParticipants: activityData.maxParticipants || 50,
      registeredCount: 0,
      status: 'upcoming',
      creator_id: userId,
      created_at: new Date().toISOString(),
      registeredUserIds: []
    };

    this.state.activities.unshift(newActivity);
    return { success: true, message: 'Activity created successfully.', activity: newActivity };
  }

  deleteActivity(userId: string, sigId: string, activityId: string): { success: boolean; message: string } {
    const userRole = this.getUserRoleInSig(userId, sigId);
    const user = this.getUserById(userId);
    const isSuperAdmin = user?.role === 'authority';

    // Constraint 2: Only SIG Owner/Admin or Authority can delete activities
    if (!isSuperAdmin && userRole !== 'sig_owner' && userRole !== 'sig_admin') {
      return { success: false, message: 'Permission denied: Only SIG Owners or Admins can delete activities.' };
    }

    const index = this.state.activities.findIndex(a => a.id === activityId && a.sig_id === sigId);
    if (index !== -1) {
      this.state.activities.splice(index, 1);
      return { success: true, message: 'Activity deleted successfully.' };
    }

    return { success: false, message: 'Activity not found in this SIG tenant.' };
  }

  registerForActivity(userId: string, sigId: string, activityId: string): { success: boolean; message: string } {
    if (!this.isUserMemberOfSig(userId, sigId)) {
      return { success: false, message: 'You must be a member of this SIG to register for its activities.' };
    }

    const activity = this.state.activities.find(a => a.id === activityId && a.sig_id === sigId);
    if (!activity) {
      return { success: false, message: 'Activity not found in this SIG.' };
    }

    if (!activity.registeredUserIds) {
      activity.registeredUserIds = [];
    }

    if (activity.registeredUserIds.includes(userId)) {
      return { success: false, message: 'You are already registered for this activity.' };
    }

    if (activity.registeredCount >= activity.maxParticipants) {
      return { success: false, message: 'This activity has reached maximum registration capacity.' };
    }

    activity.registeredUserIds.push(userId);
    activity.registeredCount = activity.registeredUserIds.length;

    // Award points
    const user = this.getUserById(userId);
    if (user) {
      user.points += 20;
    }

    return { success: true, message: 'Successfully registered for activity!' };
  }

  // Tenant-Scoped Tasks
  getSigTasks(sigId: string): Task[] {
    return this.state.tasks.filter(t => t.sig_id === sigId);
  }

  createTask(userId: string, sigId: string, taskData: Partial<Task>): { success: boolean; message: string; task?: Task } {
    const userRole = this.getUserRoleInSig(userId, sigId);
    const user = this.getUserById(userId);
    const isSuperAdmin = user?.role === 'authority';

    // Constraint 2: Only SIG Owner/Admin or Authority can create tasks
    if (!isSuperAdmin && userRole !== 'sig_owner' && userRole !== 'sig_admin') {
      return { success: false, message: 'Permission denied: Only SIG Owners or Admins can create tasks.' };
    }

    // Constraint 6: Task creation blocked if SIG has no members besides the creator
    const members = this.getSigMemberships(sigId);
    const otherMembers = members.filter(m => m.user_id !== userId);
    if (otherMembers.length === 0) {
      return {
        success: false,
        message: 'At least one additional SIG member is required before creating an activity or task.'
      };
    }

    const assignedNames: string[] = [];
    if (taskData.assignedToUserIds && taskData.assignedToUserIds.length > 0) {
      taskData.assignedToUserIds.forEach(id => {
        const u = this.getUserById(id);
        if (u) assignedNames.push(u.name);
      });
    }

    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sig_id: sigId,
      title: taskData.title || 'Untitled SIG Task',
      description: taskData.description || '',
      deadline: taskData.deadline || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      priority: taskData.priority || 'medium',
      status: taskData.status || 'not_started',
      assignedToUserIds: taskData.assignedToUserIds || [userId],
      assignedToNames: assignedNames.length > 0 ? assignedNames : [user?.name || 'Member'],
      progressPercent: taskData.progressPercent || 0,
      creator_id: userId,
      created_at: new Date().toISOString(),
      pointsReward: taskData.pointsReward || 50
    };

    this.state.tasks.unshift(newTask);
    return { success: true, message: 'Task created successfully.', task: newTask };
  }

  updateTaskStatus(userId: string, sigId: string, taskId: string, status: Task['status'], progressPercent: number): { success: boolean; message: string } {
    if (!this.isUserMemberOfSig(userId, sigId)) {
      return { success: false, message: 'You must be a member of this SIG to update its tasks.' };
    }

    const task = this.state.tasks.find(t => t.id === taskId && t.sig_id === sigId);
    if (!task) {
      return { success: false, message: 'Task not found in this SIG tenant.' };
    }

    const prevStatus = task.status;
    task.status = status;
    task.progressPercent = progressPercent;

    // If completed now, award points
    if (prevStatus !== 'completed' && status === 'completed') {
      const user = this.getUserById(userId);
      if (user) {
        user.points += (task.pointsReward || 50);
        // Check for Active Learner badge
        if (user.points >= 200 && !user.badges.some(b => b.name === 'Active Learner')) {
          user.badges.push({
            id: `badge-${Date.now()}`,
            name: 'Active Learner',
            description: 'Participated in workshops and completed tasks on time',
            icon: '🚀',
            sig_id: sigId,
            earned_at: new Date().toISOString()
          });
        }
      }
    }

    return { success: true, message: 'Task updated successfully.' };
  }

  deleteTask(userId: string, sigId: string, taskId: string): { success: boolean; message: string } {
    const userRole = this.getUserRoleInSig(userId, sigId);
    const user = this.getUserById(userId);
    const isSuperAdmin = user?.role === 'authority';

    // Constraint 2: Only SIG Owner/Admin or Authority can delete tasks
    if (!isSuperAdmin && userRole !== 'sig_owner' && userRole !== 'sig_admin') {
      return { success: false, message: 'Permission denied: Only SIG Owners or Admins can delete tasks.' };
    }

    const index = this.state.tasks.findIndex(t => t.id === taskId && t.sig_id === sigId);
    if (index !== -1) {
      this.state.tasks.splice(index, 1);
      return { success: true, message: 'Task deleted successfully.' };
    }

    return { success: false, message: 'Task not found in this SIG tenant.' };
  }

  // Tenant-Scoped Notifications
  getSigNotifications(sigId: string): Notification[] {
    return this.state.notifications.filter(n => n.sig_id === sigId);
  }

  // Constraint 7: Students must NOT receive notifications from SIGs they have not joined.
  // Backend strictly filters by checking user's joined SIGs.
  getUserNotifications(userId: string): Notification[] {
    const memberships = this.getUserMemberships(userId);
    const joinedSigIds = new Set(memberships.map(m => m.sig_id));

    const readIds = new Set(this.state.userReadNotificationIds[userId] || []);

    // Filter strictly to notifications matching joined SIGs
    return this.state.notifications
      .filter(n => joinedSigIds.has(n.sig_id))
      .map(n => ({
        ...n,
        isRead: readIds.has(n.id)
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  markNotificationAsRead(userId: string, notifId: string): void {
    if (!this.state.userReadNotificationIds[userId]) {
      this.state.userReadNotificationIds[userId] = [];
    }
    if (!this.state.userReadNotificationIds[userId].includes(notifId)) {
      this.state.userReadNotificationIds[userId].push(notifId);
    }
  }

  createNotification(userId: string, sigId: string, data: { title: string; message: string; priority: 'normal' | 'important' | 'urgent'; category?: 'events' | 'workshops' | 'announcements' | 'general' }): { success: boolean; message: string; notification?: Notification } {
    const userRole = this.getUserRoleInSig(userId, sigId);
    const user = this.getUserById(userId);
    const isSuperAdmin = user?.role === 'authority';

    if (!isSuperAdmin && userRole !== 'sig_owner' && userRole !== 'sig_admin') {
      return { success: false, message: 'Permission denied: Only SIG Owners, Admins, or Central Authorities can publish notifications.' };
    }

    const sig = this.getSigById(sigId);
    if (!sig) {
      return { success: false, message: 'Target SIG not found.' };
    }

    const newNotif: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sig_id: sigId,
      sig_name: sig.name,
      title: data.title,
      message: data.message,
      priority: data.priority || 'normal',
      category: data.category || 'announcements',
      created_by: userId,
      created_by_name: user?.name || 'SIG Coordinator',
      created_at: new Date().toISOString()
    };

    this.state.notifications.unshift(newNotif);
    return { success: true, message: `Notification broadcasted to all ${sig.name} members!`, notification: newNotif };
  }

  // Tenant-Scoped Resources
  getSigResources(sigId: string): SIGResource[] {
    return this.state.resources.filter(r => r.sig_id === sigId);
  }

  addResource(userId: string, sigId: string, resourceData: Partial<SIGResource>): { success: boolean; message: string; resource?: SIGResource } {
    if (!this.isUserMemberOfSig(userId, sigId)) {
      return { success: false, message: 'You must be a member of this SIG to upload resources.' };
    }

    const user = this.getUserById(userId);
    const newRes: SIGResource = {
      id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sig_id: sigId,
      title: resourceData.title || 'SIG Document',
      description: resourceData.description || '',
      type: resourceData.type || 'pdf',
      url: resourceData.url || 'https://resources.tce.edu/sample.pdf',
      size: resourceData.size || '2.5 MB',
      uploaded_by: user?.name || 'Member',
      uploaded_at: new Date().toISOString()
    };

    this.state.resources.unshift(newRes);
    return { success: true, message: 'Resource added to SIG Hub.', resource: newRes };
  }

  // Tenant-Scoped Leaderboard (Constraint 13: Strictly isolated to members of that specific SIG)
  getSigLeaderboard(sigId: string): LeaderboardEntry[] {
    const memberships = this.getSigMemberships(sigId);
    const entries: LeaderboardEntry[] = [];

    memberships.forEach(m => {
      const user = this.getUserById(m.user_id);
      if (user) {
        // Calculate SIG-specific contributions
        const sigTasksCompleted = this.state.tasks.filter(t => t.sig_id === sigId && t.assignedToUserIds.includes(user.id) && t.status === 'completed').length;
        const sigActivitiesAttended = this.state.activities.filter(a => a.sig_id === sigId && a.registeredUserIds?.includes(user.id)).length;
        const sigBadges = user.badges.filter(b => b.sig_id === sigId).length;

        entries.push({
          rank: 0,
          user_id: user.id,
          name: user.name,
          avatar: user.avatar,
          department: user.department,
          points: (sigTasksCompleted * 60) + (sigActivitiesAttended * 40) + (sigBadges * 50) + 100,
          tasksCompleted: sigTasksCompleted,
          activitiesAttended: sigActivitiesAttended,
          badgesCount: sigBadges
        });
      }
    });

    entries.sort((a, b) => b.points - a.points);
    entries.forEach((e, i) => { e.rank = i + 1; });
    return entries;
  }

  // Student Journey Summary
  getStudentJourney(userId: string): StudentJourneySummary {
    const user = this.getUserById(userId);
    const memberships = this.getUserMemberships(userId);

    const sigParticipationRates = memberships.map(m => {
      const sig = this.getSigById(m.sig_id);
      const totalActivities = this.getSigActivities(m.sig_id).length || 1;
      const attended = this.getSigActivities(m.sig_id).filter(a => a.registeredUserIds?.includes(userId)).length;
      const tasksDone = this.getSigTasks(m.sig_id).filter(t => t.assignedToUserIds.includes(userId) && t.status === 'completed').length;
      
      const rate = Math.min(100, Math.round(((attended / totalActivities) * 0.6 + (tasksDone > 0 ? 0.4 : 0.1)) * 100));

      return {
        sig_id: m.sig_id,
        sig_name: sig?.name || m.sig_id,
        participationPercent: rate || 50,
        tasksDone,
        eventsAttended: attended
      };
    });

    const completedTasksCount = this.state.tasks.filter(t => t.assignedToUserIds.includes(userId) && t.status === 'completed').length;
    const attendedActivitiesCount = this.state.activities.filter(a => a.registeredUserIds?.includes(userId)).length;

    const timeline = [
      {
        id: 't-1',
        type: 'joined_sig' as const,
        title: 'Joined Special Interest Group',
        description: `Officially became a member of ${sigParticipationRates[0]?.sig_name || 'TCE SIG'}`,
        sig_name: sigParticipationRates[0]?.sig_name || 'TCE SIG',
        date: '2025-07-01'
      },
      {
        id: 't-2',
        type: 'attended_activity' as const,
        title: 'Attended Hands-on Technical Workshop',
        description: 'Successfully completed the interactive laboratory sessions and code review.',
        sig_name: sigParticipationRates[0]?.sig_name || 'TCE SIG',
        date: '2025-08-15'
      },
      {
        id: 't-3',
        type: 'earned_badge' as const,
        title: 'Earned Active Learner Badge',
        description: 'Recognized for timely sprint task deliveries and high engagement.',
        sig_name: sigParticipationRates[0]?.sig_name || 'TCE SIG',
        date: '2025-08-20'
      }
    ];

    return {
      totalPoints: user?.points || 300,
      joinedSigsCount: memberships.length,
      completedTasksCount,
      attendedActivitiesCount,
      streakDays: 14,
      sigParticipationRates,
      timeline
    };
  }

  // Authority Operations
  createSig(creatorId: string, sigData: Partial<SIG>): { success: boolean; message: string; sig?: SIG } {
    const user = this.getUserById(creatorId);
    if (user?.role !== 'authority') {
      return { success: false, message: 'Permission denied: Only central authorities can create new Special Interest Groups.' };
    }

    const newSig: SIG = {
      id: `sig-${sigData.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || Date.now()}`,
      name: sigData.name || 'New Special Interest Group',
      shortName: sigData.shortName || sigData.name?.substring(0, 15) || 'SIG',
      description: sigData.description || 'A new Special Interest Group at Thiagarajar College of Engineering.',
      category: sigData.category || 'Engineering',
      department: sigData.department || 'Computer Science & Engineering',
      logo: sigData.logo || '🚀',
      coverImage: sigData.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      owner_id: creatorId,
      owner_name: user.name,
      member_count: 1,
      max_members: 50,
      objectives: sigData.objectives || ['Foster hands-on technical excellence and peer collaboration'],
      technologies: sigData.technologies || ['Modern Frameworks'],
      skillsGained: sigData.skillsGained || ['Technical Leadership', 'Project Engineering'],
      achievements: ['Newly inaugurated at TCE'],
      meetingSchedule: sigData.meetingSchedule || 'Every Thursday, 4:45 PM',
      venue: sigData.venue || 'TCE Seminar Complex',
      facultyAdvisor: sigData.facultyAdvisor || 'TCE Faculty Advisor',
      status: 'active',
      created_at: new Date().toISOString()
    };

    this.state.sigs.push(newSig);

    // Add creator as initial owner
    this.state.memberships.push({
      id: `m-${Date.now()}`,
      user_id: creatorId,
      sig_id: newSig.id,
      role: 'sig_owner',
      status: 'active',
      joined_at: new Date().toISOString()
    });

    return { success: true, message: `Special Interest Group "${newSig.name}" created successfully!`, sig: newSig };
  }

  updateSig(updaterId: string, sigId: string, data: Partial<SIG>): { success: boolean; message: string } {
    const user = this.getUserById(updaterId);
    const userRoleInSig = this.getUserRoleInSig(updaterId, sigId);
    const isSuperAdmin = user?.role === 'authority';

    if (!isSuperAdmin && userRoleInSig !== 'sig_owner') {
      return { success: false, message: 'Permission denied: Only SIG Owners or Central Authorities can modify SIG details.' };
    }

    const sig = this.getSigById(sigId);
    if (!sig) {
      return { success: false, message: 'SIG not found.' };
    }

    Object.assign(sig, data);
    return { success: true, message: 'SIG details updated successfully.' };
  }

  // Teacher & Faculty Specific Operations
  getTeacherSigs(teacherId: string): SIG[] {
    const teacher = this.getUserById(teacherId);
    if (!teacher) return [];

    if (teacher.role === 'authority') {
      return this.state.sigs;
    }

    if (teacher.advisedSigIds && teacher.advisedSigIds.length > 0) {
      return this.state.sigs.filter(s =>
        teacher.advisedSigIds?.includes(s.id) ||
        s.facultyAdvisor?.toLowerCase().includes(teacher.name.toLowerCase()) ||
        s.facultyAdvisorEmail === teacher.email
      );
    }

    // Match by department or advisor name
    return this.state.sigs.filter(s =>
      s.department.toLowerCase().includes(teacher.department.toLowerCase()) ||
      s.facultyAdvisor?.toLowerCase().includes(teacher.name.toLowerCase())
    );
  }

  getSigRoster(sigId: string) {
    const sig = this.getSigById(sigId);
    if (!sig) return [];

    const memberships = this.getSigMemberships(sigId);
    const roster = memberships.map(m => {
      const student = this.getUserById(m.user_id);
      if (!student) return null;

      const tasksCompleted = this.state.tasks.filter(t => t.sig_id === sigId && t.assignedToUserIds.includes(student.id) && t.status === 'completed').length;
      const activitiesAttended = this.state.activities.filter(a => a.sig_id === sigId && a.registeredUserIds?.includes(student.id)).length;

      return {
        id: student.id,
        name: student.name,
        email: student.email,
        rollNo: student.rollNo || '23CS' + Math.floor(100 + Math.random() * 800),
        department: student.department,
        year: student.year || '3rd Year B.Tech / B.E',
        avatar: student.avatar,
        role: m.role,
        status: m.status,
        joined_at: m.joined_at,
        points: student.points,
        badgesCount: student.badges.filter(b => b.sig_id === sigId).length,
        tasksCompleted,
        activitiesAttended
      };
    }).filter(Boolean);

    return roster;
  }

  publishTeacherNotification(teacherId: string, sigId: string, data: {
    title: string;
    message: string;
    priority?: 'normal' | 'important' | 'urgent';
    category?: 'events' | 'workshops' | 'announcements' | 'general';
    eventDate?: string;
    eventTime?: string;
    eventVenue?: string;
    meetingLink?: string;
    isClassroomActivity?: boolean;
  }): { success: boolean; message: string; notification?: Notification } {
    const teacher = this.getUserById(teacherId);
    const sig = this.getSigById(sigId);
    if (!sig) {
      return { success: false, message: 'Target SIG not found.' };
    }

    let formattedMessage = data.message;
    if (data.eventDate || data.eventVenue || data.isClassroomActivity) {
      formattedMessage += `\n\n📌 Session Information:\n• Event Date/Time: ${data.eventDate || 'Scheduled Activity'} ${data.eventTime ? `at ${data.eventTime}` : ''}\n• Venue/Classroom: ${data.eventVenue || sig.venue}`;
      if (data.meetingLink) {
        formattedMessage += `\n• Meeting Link: ${data.meetingLink}`;
      }
    }

    const newNotif: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sig_id: sigId,
      sig_name: sig.name,
      title: data.title,
      message: formattedMessage,
      priority: data.priority || 'important',
      category: data.category || (data.isClassroomActivity ? 'workshops' : 'events'),
      created_by: teacherId,
      created_by_name: `${teacher?.name || 'Faculty Advisor'} (${teacher?.designation || 'Faculty Advisor, TCE'})`,
      created_at: new Date().toISOString()
    };

    this.state.notifications.unshift(newNotif);

    // If it's a classroom activity or upcoming event with date, also auto-create an Activity record!
    if (data.isClassroomActivity || (data.eventDate && data.category === 'events')) {
      const newActivity: Activity = {
        id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        sig_id: sigId,
        title: data.title,
        description: data.message,
        category: data.isClassroomActivity ? 'hands-on' : 'workshop',
        date: data.eventDate || new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        time: data.eventTime || '4:45 PM - 6:30 PM',
        venue: data.eventVenue || sig.venue,
        isOnline: Boolean(data.meetingLink),
        meetingLink: data.meetingLink,
        organizer: `${teacher?.name || 'Faculty Advisor'} (Advisor)`,
        registrationDeadline: new Date(Date.now() + 5 * 86400000).toISOString(),
        maxParticipants: sig.max_members || 50,
        registeredCount: 0,
        status: 'upcoming',
        creator_id: teacherId,
        created_at: new Date().toISOString(),
        registeredUserIds: []
      };
      this.state.activities.unshift(newActivity);
    }

    return {
      success: true,
      message: `Notification & Classroom Update published to all enrolled students of ${sig.name}!`,
      notification: newNotif
    };
  }

  getPlatformStats() {
    const totalSigs = this.state.sigs.length;
    const totalStudents = this.state.users.filter(u => u.role === 'student').length;
    const totalMemberships = this.state.memberships.filter(m => m.status === 'active').length;
    const totalActivities = this.state.activities.length;
    const totalTasks = this.state.tasks.length;
    const totalNotifications = this.state.notifications.length;

    return {
      totalSigs,
      totalStudents,
      totalMemberships,
      totalActivities,
      totalTasks,
      totalNotifications,
      avgMembersPerSig: Math.round(totalMemberships / totalSigs)
    };
  }

  // Reset to initial seed state if needed for demo
  resetState(): void {
    this.state = {
      users: JSON.parse(JSON.stringify(initialUsers)),
      sigs: JSON.parse(JSON.stringify(initialSigs)),
      memberships: JSON.parse(JSON.stringify(initialMemberships)),
      activities: JSON.parse(JSON.stringify(initialActivities)),
      tasks: JSON.parse(JSON.stringify(initialTasks)),
      notifications: JSON.parse(JSON.stringify(initialNotifications)),
      resources: JSON.parse(JSON.stringify(initialResources)),
      userReadNotificationIds: {
        'user-student-a': ['notif-ai-3'],
        'user-student-b': [],
        'user-student-c': ['notif-cyber-2'],
        'user-student-d': ['notif-ai-3']
      }
    };
  }
}

export const db = new DatabaseManager();
