// =============================================
// reducer.ts
// ---------------------------------------------
// This file defines the reducer function that handles
// all state transitions in the StudyHelper app.
//
// The reducer follows React’s “useReducer” pattern —
// given a current state and an action, it returns a new state.
//
// Actions handled:
// 1. START_SESSION – begins tracking a new study session.
// 2. STOP_SESSION – ends the current session and records its duration.
// 3. LOAD_STATE – loads saved or default app data.
//
// =============================================

import { AppState, Action } from '../types';

// Define the reducer function
export default function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {

    // -----------------------------------------------------
    // 1. START_SESSION
    // -----------------------------------------------------
    case 'START_SESSION': {
      // Create a new session with only a start time for now
      const newSession = {
        id: Date.now().toString(),  // Unique identifier
        start: action.payload.start // Start timestamp
      };

      // Return new state with session added to the array
      return {
        ...state,
        sessions: [...state.sessions, newSession]
      };
    }

    // -----------------------------------------------------
    // 2. STOP_SESSION
    // -----------------------------------------------------
    case 'STOP_SESSION': {
      // Find the most recent session that doesn’t have an end time
      const updatedSessions = state.sessions.map(session => {
        if (!session.end) {
          return {
            ...session,
            end: action.payload.end,
            durationMins: action.payload.durationMins
          };
        }
        return session;
      });

      // Return new state with updated sessions
      return {
        ...state,
        sessions: updatedSessions
      };
    }

    // -----------------------------------------------------
    // 3. LOAD_STATE
    // -----------------------------------------------------
    case 'LOAD_STATE': {
      // Replace entire app state (used for loading saved data)
      return action.payload;
    }

    // -----------------------------------------------------
    // Default case
    // -----------------------------------------------------
    default:
      return state;
  }
}
