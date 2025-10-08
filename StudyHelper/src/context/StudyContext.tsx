// =============================================
// StudyContext.tsx
// ---------------------------------------------
// Provides global access to the StudyHelper app state.
//
// This file:
// - Initializes default state.
// - Uses React Context to make state & dispatch available.
// - Wraps the entire app (usually in App.tsx) so that all screens
//   can read or update the study session data.
//
// =============================================

import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import { AppState, Action } from '../types';

// -----------------------------------------------------
// Default initial app state
// -----------------------------------------------------
const initialState: AppState = {
  sessions: [], // no sessions when app first loads
  settings: {
    dailyGoalMinutes: 60, // default daily goal: 1 hour
    notificationsEnabled: false
  }
};

// -----------------------------------------------------
// Create context
// -----------------------------------------------------
interface ContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

// Create context with default empty object (casted to correct type)
const StudyContext = createContext<ContextValue>({} as ContextValue);

// -----------------------------------------------------
// Context provider component
// -----------------------------------------------------
export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // useReducer returns current state and dispatch function
  const [state, dispatch] = useReducer(reducer, initialState);

  // Provide state and dispatch to all nested components
  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      {children}
    </StudyContext.Provider>
  );
};

// -----------------------------------------------------
// Custom hook: useStudyContext
// -----------------------------------------------------
// Makes it easy for screens or components to access context
export const useStudyContext = () => {
  return useContext(StudyContext);
};
