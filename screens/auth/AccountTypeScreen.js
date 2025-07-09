import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

const AccountTypeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.chooseText}>Choose your account type:</Text>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('BarRegistration')}>
        <Text style={styles.optionText}>Register as a Bar (Organization)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('BarhopperRegistration')}>
        <Text style={styles.optionText}>Register as a Barhopper (Customer)</Text>
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
});

export default AccountTypeScreen; 