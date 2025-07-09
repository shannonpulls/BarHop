import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';

// Import Screens
import WelcomeScreen from './screens/auth/WelcomeScreen';
import AccountTypeScreen from './screens/auth/AccountTypeScreen';
import BarRegistrationScreen from './screens/auth/BarRegistrationScreen';
import BarhopperRegistrationScreen from './screens/auth/BarhopperRegistrationScreen';
import SuccessScreen from './screens/auth/SuccessScreen';
import MainTabNavigator from './screens/main/MainTabNavigator';

// This is required for the auth session to work properly on web and simulators
WebBrowser.maybeCompleteAuthSession();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false, // Hides the header for all screens
            contentStyle: { backgroundColor: '#0A0A0A' }, // Set a default background color
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="AccountType" component={AccountTypeScreen} />
          <Stack.Screen name="BarRegistration" component={BarRegistrationScreen} />
          <Stack.Screen name="BarhopperRegistration" component={BarhopperRegistrationScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
          <Stack.Screen name="BarhopperDashboard" component={MainTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </View>
  );
} 