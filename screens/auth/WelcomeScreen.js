import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

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
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </Animated.View>
      <Text style={styles.appName}>BarHop</Text>
      <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('AccountType')} activeOpacity={0.85}>
        <Text style={styles.tileText}>Let's Get Started{"\n"}(Register as a Bar or Barhopper)</Text>
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
});

export default WelcomeScreen; 