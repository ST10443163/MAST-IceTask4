// Handles screen-to-screen navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all app screens
import HomeScreen from '../screens/HomeScreen';
import StudyTrackerScreen from '../screens/StudyTrackerScreen';
import StudyHistoryScreen from '../screens/StudyHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Create a stack navigator (each screen sits on top of another like a stack)
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    // NavigationContainer wraps the entire navigation tree
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: true }}
      >
        {/* Each screen component registered here */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="StudyTracker"
          component={StudyTrackerScreen}
          options={{ title: 'Study Tracker' }}
        />
        <Stack.Screen
          name="History"
          component={StudyHistoryScreen}
          options={{ title: 'Study History' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
