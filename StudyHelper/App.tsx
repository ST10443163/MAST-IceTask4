// Main entry point of the app
import React from 'react';
import { SafeAreaView } from 'react-native';
import AppNavigator from './src/navigation';       // Navigation stack (handles all screens)
import { StudyProvider } from './src/context/StudyContext'; // Global state provider

export default function App() {
  return (
    // Wraps the entire app with global StudyContext
    <StudyProvider>
      {/* SafeAreaView ensures content stays within device's safe display area */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* Load the navigation system */}
        <AppNavigator />
      </SafeAreaView>
    </StudyProvider>
  );
}
