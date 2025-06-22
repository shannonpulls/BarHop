import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [step, setStep] = useState(0);
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });
  const [barName, setBarName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  // Animation for cheers effect
  const rotate = useSharedValue(0);

  React.useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 300 }),
        withTiming(10, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {step === 0 && (
        <>
          <Animated.View style={[styles.logoContainer, animatedStyle]}>
            <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </Animated.View>
          <Text style={styles.appName}>BarHop</Text>
          <TouchableOpacity style={styles.tile} onPress={() => setStep(1)} activeOpacity={0.85}>
            <Text style={styles.tileText}>Let's Get Started{"\n"}(Register as a Bar or Barhopper)</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 1 && (
        <View style={styles.optionsContainer}>
          <Text style={styles.chooseText}>Choose your account type:</Text>
          <TouchableOpacity style={styles.optionButton} onPress={() => setStep(2)}>
            <Text style={styles.optionText}>Register as a Bar (Organization)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Register as a Barhopper (Customer)</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 2 && (
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
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b', // dark background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 180,
    height: 180,
  },
  appName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 40,
    color: '#fff',
    marginBottom: 40,
    letterSpacing: 1,
    textAlign: 'center',
  },
  tile: {
    backgroundColor: '#fbbf24',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 10,
  },
  tileText: {
    color: '#18181b',
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  chooseText: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionButton: {
    width: '100%',
    backgroundColor: '#27272a',
    borderRadius: 10,
    paddingVertical: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  optionText: {
    fontSize: 18,
    color: '#fbbf24',
    fontFamily: 'Poppins_700Bold',
  },
  formContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    width: '100%',
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
