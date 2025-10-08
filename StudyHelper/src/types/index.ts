// =============================================
// types/index.ts
// ---------------------------------------------
// This file defines the TypeScript interfaces
// and enums used throughout the StudyHelper app.
//
// Purpose:
// - Provides strong typing for data consistency.
// - Makes the reducer, context, and components safer.
// =============================================

// Represents one study session record
export interface StudySession {
  id: string;             // Unique session identifier
  start: string;          // ISO timestamp when session started
  end?: string;           // ISO timestamp when session ended (optional if still running)
  durationMins?: number;  // Total duration in minutes (set once session stops)
}

// Represents user-configurable app settings
export interface Settings {
  dailyGoalMinutes: number;       // Target study time per day in minutes
  notificationsEnabled: boolean;  // Whether to send reminders (future feature)
}

// The main app state structure used in context and reducer
export interface AppState {
  sessions: StudySession[];  // List of all study sessions
  settings: Settings;        // User preferences
}

// Defines all action types used by the reducer
export type Action =
  | { type: 'START_SESSION'; payload: { start: string } } // Start timer
  | { type: 'STOP_SESSION'; payload: { end: string; durationMins: number } } // Stop timer
  | { type: 'LOAD_STATE'; payload: AppState }; // Replace current state (e.g. after load or settings update)
