import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MapScreen from './MapScreen';
import BarhopperDashboard from './BarhopperDashboard';
import BarDetailsScreen from './BarDetailsScreen';
import PostScreen from './PostScreen';

// Placeholder screens
const FeedScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Feed Coming Soon</Text>
  </View>
);
const FriendsScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Friends Coming Soon</Text>
  </View>
);
const ProfileScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Profile Coming Soon</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator for the main app
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <LinearGradient
            colors={['rgba(10, 10, 10, 0.95)', 'rgba(26, 26, 26, 0.95)']}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarActiveTintColor: '#FF6B9D',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Text style={[styles.icon, { color }]}>🗺️</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Text style={[styles.icon, { color }]}>📢</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Text style={[styles.icon, { color }]}>➕</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Text style={[styles.icon, { color }]}>👥</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Text style={[styles.icon, { color }]}>👤</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main Stack Navigator that includes tabs and detail screens
const MainTabNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A0A0A' },
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="BarDetails" component={BarDetailsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 107, 157, 0.3)',
    backgroundColor: 'transparent',
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: 'rgba(255, 107, 157, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 157, 0.5)',
  },
  icon: {
    fontSize: 20,
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#888',
  },
});

export default MainTabNavigator; 