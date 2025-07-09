import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';

const PostScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setPhoto(data.uri);
      setCameraOpen(false);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.center}><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.center}><Text>No access to camera</Text></View>;
  }

  if (cameraOpen) {
    return (
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={cameraRef} type={Camera.Constants.Type.back}>
          <View style={styles.cameraOverlay}>
            <TouchableOpacity style={styles.snapButton} onPress={takePicture}>
              <Text style={styles.snapText}>📸</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setCameraOpen(false)}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0A0A', '#1A1A1A']} style={StyleSheet.absoluteFill} />
      <Text style={styles.title}>Create a Post</Text>
      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => setPhoto(null)}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => alert('Post feature coming soon!')}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.openCameraButton} onPress={() => setCameraOpen(true)}>
          <Text style={styles.openCameraText}>Open Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    color: '#FF6B9D',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 30,
  },
  openCameraButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 20,
  },
  openCameraText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  previewContainer: {
    alignItems: 'center',
  },
  preview: {
    width: 300,
    height: 400,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220,
  },
  button: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FF6B9D',
  },
  buttonText: {
    color: '#FF6B9D',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  snapButton: {
    backgroundColor: '#FF6B9D',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  snapText: {
    fontSize: 32,
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 30,
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 20,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
});

export default PostScreen; 