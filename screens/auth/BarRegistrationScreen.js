import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as Google from 'expo-auth-session/providers/google';
import { AUTH_CONFIG } from '../../config/auth';
// import { auth, db } from '../../config/firebase';
// import { GoogleAuthProvider, signInWithCredential, OAuthProvider } from 'firebase/auth';
// import { doc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';

const BarRegistrationScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  const [barName, setBarName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = () => {
    // For now, just navigate to success screen
    navigation.navigate('Success', {
      accountType: 'bar',
      userData: {
        name: barName,
        email: email,
        phone: '',
        address: address,
        description: description
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.formTitle}>Bar Registration</Text>
        <TextInput
          style={styles.input}
          placeholder="Bar Name"
          placeholderTextColor="#aaa"
          value={barName}
          onChangeText={setBarName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#aaa"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Short Description"
          placeholderTextColor="#aaa"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
  },
  formContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  formTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#23232b',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 18,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    borderWidth: 1,
    borderColor: '#333',
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#fbbf24',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#18181b',
    fontSize: 18,
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
  },
  backButtonText: {
    color: '#fbbf24',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});

export default BarRegistrationScreen; 