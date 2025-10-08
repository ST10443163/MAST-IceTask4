// Displays all completed study sessions
// Allows user to view session details and delete sessions

import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { StudyContext } from '../context/StudyContext';
import { format } from 'date-fns';

export default function StudyHistoryScreen() {
  const { state, dispatch } = useContext(StudyContext);

  return (
    <View style={{ flex: 1 }}>
      {/* FlatList efficiently renders session data */}
      <FlatList
        data={state.sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.subjectName ?? 'General Study'}</Text>
            {/* Display session time and duration */}
            <Text>
              {format(new Date(item.start), 'Pp')} — {item.end ? format(new Date(item.end), 'Pp') : 'In progress'}
            </Text>
            <Text>{item.durationMins ? `${item.durationMins} min` : '—'}</Text>

            {/* Optional notes */}
            {item.notes ? <Text style={styles.notes}>Notes: {item.notes}</Text> : null}

            {/* Delete button for removing unwanted sessions */}
            <Button title="Delete" onPress={() => dispatch({ type: 'DELETE_SESSION', payload: { id: item.id } })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontWeight: '700' },
  notes: { marginTop: 6, color: '#444' },
});
