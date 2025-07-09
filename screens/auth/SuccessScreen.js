import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';

const SuccessScreen = ({ navigation, route }) => {
  const { accountType, userData } = route.params || {};

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  useEffect(() => {
    // Auto-navigate to dashboard after 3 seconds
    const timer = setTimeout(() => {
      if (accountType === 'barhopper') {
        navigation.replace('BarhopperDashboard');
      } else {
        // For bars, we could navigate to a bar dashboard later
        navigation.replace('BarhopperDashboard'); // Temporary
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, accountType]);

  const handleContinue = () => {
    navigation.navigate('MainTabs', { screen: 'Map' });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#0A0A0A', '#1A1A1A', '#0A0A0A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.successIcon}>🎉</Text>
        </View>
        
        <Text style={styles.title}>Welcome to NightOut!</Text>
        <Text style={styles.subtitle}>
          {accountType === 'barhopper' 
            ? "You're all set to discover amazing bars!"
            : "Your bar is now ready to welcome customers!"
          }
        </Text>
        
        <View style={styles.userInfo}>
          {userData && (
            <>
              <Text style={styles.userName}>Welcome, {userData.name || 'Barhopper'}! 🍸</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <LinearGradient
            colors={['#FF6B9D', '#FF8E53']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {accountType === 'barhopper' ? 'Start Exploring' : 'Go to Dashboard'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 107, 157, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  successIcon: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  userInfo: {
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 157, 0.3)',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6B9D',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
  },
  continueButton: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
});

export default SuccessScreen; 