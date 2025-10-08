// ==========================
// ProfileScreen.tsx
// --------------------------
// Displays user information and study statistics.
// This can later be extended to include avatar, name, and achievements.
// ==========================

import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StudyContext } from '../context/StudyContext';

export default function ProfileScreen() {
  // Access global state
  const { state } = useContext(StudyContext);

  // Calculate total sessions and total study time (all-time)
  const totalSessions = state.sessions.length;
  const totalMinutes = state.sessions.reduce(
    (sum: any, s: { durationMins: any; }) => sum + (s.durationMins ?? 0),
    0
  );

  // Calculate average session duration
  const avgDuration = totalSessions > 0 ? (totalMinutes / totalSessions).toFixed(1) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>

      {/* Basic profile summary (placeholder for now) */}
      <Text style={styles.info}>Name: Student User</Text>
      <Text style={styles.info}>Goal: {state.settings.dailyGoalMinutes} mins/day</Text>

      {/* Study statistics */}
      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>Study Stats</Text>
        <Text>Total Sessions: {totalSessions}</Text>
        <Text>Total Study Time: {totalMinutes} mins</Text>
        <Text>Average Duration: {avgDuration} mins/session</Text>
      </View>

      {/* Feedback tip */}
      <Text style={styles.tip}>
        Keep it up! You're building strong study habits every day.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#007AFF', marginBottom: 15 },
  info: { fontSize: 16, marginBottom: 5 },
  statsBox: {
    backgroundColor: '#eef5ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  statsTitle: { fontWeight: 'bold', marginBottom: 10 },
  tip: { marginTop: 25, color: '#444', fontStyle: 'italic', textAlign: 'center' },
});
