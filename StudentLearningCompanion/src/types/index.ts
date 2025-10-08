export type SubjectId = string;

export interface StudySession {
    id: string;
    subjectid: SubjectId | null;
    subjectName?: string;
    start: string; //ISO
    end?: string; //ISO;
    durationMins?: number; //Computed when ended
    notes?: string;
    tags?: string; //e.g., "revision", "homework"
}

export interface Subject {
    id: SubjectId;
    name: string;
    color?: string;
}

export interface AppState {
    subject: Subject[];
    sessions: StudySession[]; //Ordered newest first
    activeSessionId?: string | null;
    settings: {
        dailyCoalMinutes: number;
        notificationsEnabled: boolean;
    };
}