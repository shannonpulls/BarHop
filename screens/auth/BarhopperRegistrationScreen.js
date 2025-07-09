import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import { AUTH_CONFIG } from '../../config/auth';
// import { auth, db } from '../../config/firebase';
// import { GoogleAuthProvider, signInWithCredential, OAuthProvider } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';

// This is required for the auth session to work properly on web and simulators
WebBrowser.maybeCompleteAuthSession();

const BarhopperRegistrationScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  // Use the hook provided by expo-auth-session/providers/google
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: AUTH_CONFIG.GOOGLE.CLIENT_ID,
    iosClientId: AUTH_CONFIG.GOOGLE.IOS_CLIENT_ID,
  });

  // This useEffect hook will trigger when the Google sign-in flow returns a response.
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      // Temporarily just show success without Firebase
      Alert.alert('Success', 'Google sign-in successful! (Firebase temporarily disabled)');
      navigation.navigate('Success', { 
        userInfo: {
          provider: 'google',
          id: 'temp-id',
          name: 'Test User',
          email: 'test@example.com',
        }
      });
    }
  }, [response]);

  // The new handleGoogleSignIn function simply calls the prompt from the hook
  const handleGoogleSignIn = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success') {
        const { access_token } = result.params;
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const userInfo = await response.json();
        
        // For now, just navigate to success screen
        handleSignInSuccess({
          name: userInfo.name,
          email: userInfo.email,
          id: userInfo.id,
          provider: 'google',
          picture: userInfo.picture
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google');
    }
  };

  // Apple Sign-In
  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      
      // Handle null values from Apple Sign-In
      const firstName = credential.fullName?.givenName || '';
      const lastName = credential.fullName?.familyName || '';
      const fullName = `${firstName} ${lastName}`.trim() || 'Barhopper';
      
      handleSignInSuccess({
        name: fullName,
        email: credential.email || 'user@example.com',
        id: credential.user,
        provider: 'apple'
      });
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        // User canceled the sign-in
        return;
      }
      Alert.alert('Error', 'Failed to sign in with Apple');
    }
  };

  const handleSignInSuccess = (userInfo) => {
    // For now, just navigate to success screen
    navigation.navigate('Success', {
      accountType: 'barhopper',
      userData: {
        name: userInfo.name,
        email: userInfo.email,
        id: userInfo.id,
        provider: userInfo.provider
      }
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Barhopper Registration</Text>
      <Text style={styles.subtitle}>Sign up to discover amazing bars and events!</Text>
      
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonIcon}>G</Text>
          <Text style={styles.buttonText}>Continue with Google</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonIcon}>🍎</Text>
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18181b',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    formTitle: {
        fontSize: 28,
        fontFamily: 'Poppins_700Bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#a1a1aa',
        marginBottom: 30,
        textAlign: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        fontSize: 20,
        marginRight: 12,
        color: '#fff',
    },
    googleButton: {
        width: '100%',
        backgroundColor: '#4285F4',
        borderRadius: 10,
        paddingVertical: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    appleButton: {
        width: '100%',
        backgroundColor: '#000000',
        borderRadius: 10,
        paddingVertical: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
    },
    backButton: {
        width: '100%',
        height: 45,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fbbf24',
        marginTop: 10,
    },
    backButtonText: {
        color: '#fbbf24',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
});

export default BarhopperRegistrationScreen; 