// Main study tracking screen
// Allows users to start and end study sessions, write notes, and view elapsed time

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { StudyContext } from '../context/StudyContext';
import { format } from 'date-fns';

export default function StudyTrackerScreen() {
  const { state, dispatch } = useContext(StudyContext);

  // Get the currently active study session
  const activeSession = state.sessions.find((s: { id: any; }) => s.id === state.activeSessionId);

  const [elapsedMins, setElapsedMins] = useState(0);
  const [notes, setNotes] = useState('');

  // Update elapsed time every second when a session is active
  useEffect(() => {
    let timer: number | undefined;
    if (activeSession) {
      const start = new Date(activeSession.start).getTime();
      timer = setInterval(() => {
        const diff = Math.round((Date.now() - start) / 60000);
        setElapsedMins(diff);
      }, 1000) as unknown as number;
    } else {
      setElapsedMins(0);
    }

    // Clean up interval when component unmounts
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeSession?.id]);

  // Start a new study session
  function handleStart(subjectId?: string, subjectName?: string) {
    dispatch({ type: 'START_SESSION', payload: { subjectId, subjectName } });
    setNotes('');
  }

  // End the current session and save notes
  function handleEnd() {
    dispatch({ type: 'END_SESSION', payload: { notes } });
    setNotes('');
  }

  return (
    <View style={styles.container}>
      {/* When no session is active */}
      {!activeSession ? (
        <>
          <Text style={styles.title}>No active session</Text>
          <Button title="Start Generic Session" onPress={() => handleStart(undefined, 'General Study')} />
          <View style={{ height: 12 }} />
          <Button title="Start Session: Mathematics" onPress={() => handleStart('math-1', 'Mathematics')} />
        </>
      ) : (
        // When a session is active
        <>
          <Text style={styles.title}>Studying: {activeSession.subjectName ?? 'General'}</Text>
          <Text style={styles.timer}>{elapsedMins} min</Text>
          <Text style={styles.small}>Started at {format(new Date(activeSession.start), 'p, MMM d')}</Text>

          {/* Notes input */}
          <TextInput
            style={styles.input}
            placeholder="Notes for this session"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <Button title="End Session" onPress={handleEnd} />
        </>
      )}
    </View>
  );
}

// Basic styling
const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  timer: { fontSize: 36, fontWeight: '700', marginVertical: 8 },
  small: { color: '#666', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', minHeight: 60, padding: 8, marginBottom: 12 },
});
