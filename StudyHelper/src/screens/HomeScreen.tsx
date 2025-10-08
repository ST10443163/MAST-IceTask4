// ==========================
// HomeScreen.tsx
// --------------------------
// The app's main landing page.
// Displays a summary of study progress and navigation buttons
// to access the Study Tracker, History, Profile, and Settings.
// ==========================

import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useStudyContext } from '../context/useStudyContext';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

export default function HomeScreen() {
  // Access global app data from the StudyContext
  const { state } = useContext(useStudyContext);

  // Navigation hook to move between screens
  const navigation = useNavigation();

  // Calculate total study minutes completed today
  const today = new Date().toDateString();
  const todayTotal = state.sessions
    .filter((s: { end: any; start: string | number | Date; }) => s.end && new Date(s.start).toDateString() === today)
    .reduce((sum: any, s: { durationMins: any; }) => sum + (s.durationMins ?? 0), 0);

  return (
    <View style={styles.container}>
      {/* App title */}
      <Text style={styles.title}>StudyHelper</Text>
      <Text style={styles.subtitle}>Your Personal Study Companion</Text>

      {/* Display today's progress summary */}
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Today’s Total Study Time: {todayTotal} mins
        </Text>
        <Text style={styles.statsText}>
          Daily Goal: {state.settings.dailyGoalMinutes} mins
        </Text>
      </View>

      {/* Quick navigation buttons */}
      <Button title="Start Studying" onPress={() => navigation.navigate('StudyTracker')} />
      <View style={{ height: 10 }} />
      <Button title="View History" onPress={() => navigation.navigate('History')} />
      <View style={{ height: 10 }} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <View style={{ height: 10 }} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />

      {/* Motivational message */}
      <Text style={styles.quote}>
        "Small progress each day adds up to big results."
      </Text>

      {/* Last updated time (feedback for data refresh) */}
      <Text style={styles.small}>
        Last updated: {format(new Date(), 'Pp')}
      </Text>
    </View>
  );
}

// Basic styling
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#f7faff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#007AFF', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#333', marginBottom: 20 },
  stats: { marginBottom: 20, alignItems: 'center' },
  statsText: { fontSize: 16, marginVertical: 4 },
  quote: { fontStyle: 'italic', color: '#666', marginTop: 30, textAlign: 'center' },
  small: { marginTop: 12, color: '#999', fontSize: 12 },
});
