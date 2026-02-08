
export enum ExamType {
  WAEC = 'WAEC',
  NECO = 'NECO',
  JAMB = 'JAMB'
}

export enum DepartmentType {
  SCIENCE = 'Science',
  ART = 'Arts',
  COMMERCIAL = 'Commercial'
}

export enum TrackType {
  SCIENCE = 'Science',
  ART = 'Arts',
  COMMERCIAL = 'Commercial'
}

export enum SubscriptionTier {
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
  SEMI_ANNUAL = '6-Month',
  ANNUAL = 'Yearly',
  LIFETIME = 'Lifetime'
}

export interface UserProfile {
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  dob: string;
  gender: string;
  location: string;
  schoolName: string;
  targetInstitution: string;
  targetCourse: string;
  studyLevel: string; // SS1, SS2, SS3, JAMB-Prep
  examCenter?: string;
}

export interface Subject {
  id: string;
  name: string;
  departments: DepartmentType[];
  isCompulsory: boolean;
}

export interface Question {
  id: string;
  subjectId: string;
  topicId?: string;
  // Added topic property to store the name/label of the topic for display and search
  topic?: string;
  examId: ExamType;
  year: number;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation?: string; 
  source: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export enum PracticeMode {
  QUIZ = 'Quiz',
  TEST = 'Test',
  CBT = 'CBT'
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent';
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'Open' | 'Closed';
  timestamp: number;
}

export interface UserProgress {
  selectedExam: ExamType | null;
  selectedDept: DepartmentType | null;
  selectedTrack: TrackType | null; 
  selectedSubjects: string[];
  mastery: Record<string, number>; 
  onboarded: boolean;
  attendance: AttendanceRecord[];
  subscription: SubscriptionTier;
  trialStartDate: number | null;
  tickets: SupportTicket[];
  profile: UserProfile;
}

export interface Attempt {
  id: string;
  mode: PracticeMode;
  subjectId: string;
  score: number;
  total: number;
  duration: number; 
  timestamp: number;
}
