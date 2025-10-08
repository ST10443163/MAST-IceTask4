// Provides global app state using React Context API
// Stores study sessions, subjects, and settings persistently in AsyncStorage

import React, { createContext, useReducer, useEffect } from 'react';
import { AppState } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducer } from './reducer';

// Key for local storage
const STORAGE_KEY = 'STUDY_HELPER_STATE_v1';

// Define the initial state before any data is loaded
const initialState: AppState = {
  subjects: [],
  sessions: [],
  activeSessionId: undefined,
  settings: { dailyGoalMinutes: 120, notificationsEnabled: false },
};

// Create the context
export const StudyContext = createContext<any>(null);

// Context provider component
export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load saved data from AsyncStorage when app starts
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as AppState;
          dispatch({ type: 'LOAD_STATE', payload: parsed });
        } catch (e) {
          console.warn('Failed to parse saved state', e);
        }
      }
    })();
  }, []);

  // Save data automatically when state changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(e => console.warn(e));
  }, [state]);

  // Provide state + dispatch to all components
  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      {children}
    </StudyContext.Provider>
  );
};
