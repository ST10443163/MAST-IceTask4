export type SubjectId = string;

export interface StudySession {
  id: string;
  subjectId: SubjectId | null;
  subjectName?: string;
  start: string; // ISO
  end?: string;  // ISO
  durationMins?: number; // computed when ended
  notes?: string;
  tags?: string[]; // e.g., "revision", "homework"
}

export interface Subject {
  id: SubjectId;
  name: string;
  color?: string;
}

export interface AppState {
  subjects: Subject[];
  sessions: StudySession[]; // ordered newest first
  activeSessionId?: string | null;
  settings: {
    dailyGoalMinutes: number;
    notificationsEnabled: boolean;
  };
}
