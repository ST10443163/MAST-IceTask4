// ==========================
// SettingsScreen.tsx
// --------------------------
// Allows the user to configure preferences like
// daily goal and notifications. Demonstrates
// form handling and state updates in React Native.
// ==========================

import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, Button } from 'react-native';
import { StudyContext } from '../context/StudyContext';

export default function SettingsScreen() {
  // Access global context and dispatcher
  const { state, dispatch } = useContext(StudyContext);

  // Local input states for temporary editing
  const [goal, setGoal] = useState(String(state.settings.dailyGoalMinutes));
  const [notifications, setNotifications] = useState(state.settings.notificationsEnabled);

  // Save changes to the global state
  function handleSave() {
    const updatedSettings = {
      ...state.settings,
      dailyGoalMinutes: parseInt(goal) || 0,
      notificationsEnabled: notifications,
    };

    // Dispatch custom LOAD_STATE action to update settings only
    dispatch({
      type: 'LOAD_STATE',
      payload: { ...state, settings: updatedSettings },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Daily goal input field */}
      <Text style={styles.label}>Daily Study Goal (minutes):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={goal}
        onChangeText={setGoal}
        placeholder="Enter number of minutes"
      />

      {/* Notification toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>Enable Notifications:</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      {/* Save button */}
      <Button title="Save Changes" onPress={handleSave} />

      {/* Feedback message */}
      <Text style={styles.tip}>Your preferences will be saved automatically.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#007AFF', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 6,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tip: { color: '#777', fontStyle: 'italic', marginTop: 15 },
});
