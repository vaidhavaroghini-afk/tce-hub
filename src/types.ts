export type UserRole = 'student' | 'teacher' | 'authority' | 'sig_admin' | 'sig_owner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  year?: string;
  designation?: string; // e.g. "Professor & Head", "Associate Professor", "Assistant Professor"
  cabinLocation?: string; // e.g. "CSE Block Room 304"
  rollNo?: string;
  avatar?: string;
  skills: string[];
  interests: string[];
  points: number;
  badges: Badge[];
  hasSetPassword?: boolean;
  advisedSigIds?: string[]; // SIG IDs that this teacher/faculty advises
  notificationPreferences?: Record<string, {
    events: boolean;
    workshops: boolean;
    announcements: boolean;
    general: boolean;
  }>;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  sig_id?: string;
  earned_at: string;
}

export interface SIG {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: string;
  department: string;
  tceDeptCode?: 'CSE' | 'IT' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL' | 'MTR' | 'AI_DS' | 'ARCH' | 'SCI_HUM';
  logo: string;
  coverImage?: string;
  owner_id: string;
  owner_name: string;
  member_count: number;
  max_members: number; // Max 50 constraint
  objectives: string[];
  technologies: string[];
  skillsGained: string[];
  achievements: string[];
  meetingSchedule: string;
  venue: string;
  facultyAdvisor: string;
  facultyAdvisorEmail?: string;
  officialTceUrl?: string;
  status: 'active' | 'recruiting' | 'archived';
  created_at: string;
}

export interface Membership {
  id: string;
  user_id: string;
  sig_id: string;
  role: 'member' | 'sig_admin' | 'sig_owner';
  status: 'active' | 'pending';
  joined_at: string;
}

export interface Activity {
  id: string;
  sig_id: string;
  title: string;
  description: string;
  category: 'workshop' | 'hackathon' | 'bootcamp' | 'seminar' | 'hands-on';
  date: string;
  time: string;
  venue: string;
  isOnline: boolean;
  meetingLink?: string;
  organizer: string;
  registrationDeadline: string;
  maxParticipants: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  creator_id: string;
  created_at: string;
  registeredUserIds?: string[];
}

export interface Task {
  id: string;
  sig_id: string;
  title: string;
  description: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  assignedToUserIds: string[];
  assignedToNames?: string[];
  progressPercent: number;
  creator_id: string;
  created_at: string;
  pointsReward?: number;
}

export interface Notification {
  id: string;
  sig_id: string;
  sig_name?: string;
  title: string;
  message: string;
  priority: 'normal' | 'important' | 'urgent';
  category: 'events' | 'workshops' | 'announcements' | 'general';
  created_by: string;
  created_by_name?: string;
  created_at: string;
  isRead?: boolean;
}

export interface SIGResource {
  id: string;
  sig_id: string;
  title: string;
  description: string;
  type: 'pdf' | 'tutorial' | 'repo' | 'video' | 'cheatsheet';
  url: string;
  size?: string;
  uploaded_by: string;
  uploaded_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  name: string;
  avatar?: string;
  department: string;
  points: number;
  tasksCompleted: number;
  activitiesAttended: number;
  badgesCount: number;
}

export interface StudentJourneySummary {
  totalPoints: number;
  joinedSigsCount: number;
  completedTasksCount: number;
  attendedActivitiesCount: number;
  streakDays: number;
  sigParticipationRates: {
    sig_id: string;
    sig_name: string;
    participationPercent: number;
    tasksDone: number;
    eventsAttended: number;
  }[];
  timeline: {
    id: string;
    type: 'joined_sig' | 'completed_task' | 'attended_activity' | 'earned_badge';
    title: string;
    description: string;
    sig_name: string;
    date: string;
  }[];
}

export interface SecurityTestCase {
  id: string;
  title: string;
  description: string;
  scenario: string;
  expectedStatus: number;
  expectedMessageSnippet: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  testUser: string;
  testPayload?: any;
}
