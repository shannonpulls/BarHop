import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { API_CONFIG } from '../../config/api';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedBar, setSelectedBar] = useState(null);
  const [showBarDetails, setShowBarDetails] = useState(false);
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const mapRef = useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocation(currentLocation);
      
      const newRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      setRegion(newRegion);
      
      // Fetch nearby bars
      await fetchNearbyBars(currentLocation.coords);
      
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Error getting location');
      setLoading(false);
    }
  };

  const fetchNearbyBars = async (coords) => {
    try {
      setLoading(true);
      
      // Check if API key is configured
      if (API_CONFIG.GOOGLE_PLACES_API_KEY === 'YOUR_GOOGLE_PLACES_API_KEY') {
        console.log('Using mock data - API key not configured');
        setBars(getMockBars(coords));
        setLoading(false);
        return;
      }
      
      // Using Google Places API to find nearby bars
      const url = `${API_CONFIG.GOOGLE_PLACES_BASE_URL}/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=${API_CONFIG.SEARCH_RADIUS}&type=bar&key=${API_CONFIG.GOOGLE_PLACES_API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'OK') {
        // Filter results to only include places with types including 'bar'
        const onlyBars = data.results.filter(place => place.types && place.types.includes('bar'));
        const barsWithDetails = await Promise.all(
          onlyBars.map(async (place) => {
            // Get additional details for each place
            const detailsUrl = `${API_CONFIG.GOOGLE_PLACES_BASE_URL}/details/json?place_id=${place.place_id}&fields=rating,formatted_phone_number,opening_hours,price_level&key=${API_CONFIG.GOOGLE_PLACES_API_KEY}`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();
            
            // Calculate popularity based on rating and user ratings total
            const popularity = calculatePopularity(place.rating, place.user_ratings_total);
            
            return {
              id: place.place_id,
              name: place.name,
              rating: place.rating || 0,
              popularity: popularity,
              crowd: getCrowdType(place.types),
              vibe: getVibeType(place.types),
              music: getMusicType(place.types),
              price: getPriceLevel(detailsData.result?.price_level),
              distance: calculateDistance(coords, place.geometry.location),
              coordinate: {
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              },
              address: place.vicinity,
              phone: detailsData.result?.formatted_phone_number || 'N/A',
              hours: getHours(detailsData.result?.opening_hours),
              special: getSpecialOffer(place.types),
              image: place.photos?.[0]?.photo_reference 
                ? `${API_CONFIG.GOOGLE_PLACES_BASE_URL}/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_CONFIG.GOOGLE_PLACES_API_KEY}`
                : null,
            };
          })
        );
        
        setBars(barsWithDetails);
      } else {
        console.log('API returned status:', data.status);
        // Fallback to mock data if API fails
        setBars(getMockBars(coords));
      }
      
    } catch (error) {
      console.error('Error fetching bars:', error);
      // Fallback to mock data
      setBars(getMockBars(coords));
    } finally {
      setLoading(false);
    }
  };

  const getMockBars = (coords) => {
    // Generate mock bars around the user's location
    const mockBars = [
      {
        id: 'mock1',
        name: "Neon Dreams",
        rating: 4.8,
        popularity: 5,
        crowd: "Young Professional",
        vibe: "Cocktail Lounge",
        music: "House/Electronic",
        price: "$$",
        distance: "0.3 mi",
        coordinate: {
          latitude: coords.latitude + 0.001,
          longitude: coords.longitude + 0.001,
        },
        address: "123 Nightlife Ave, Downtown",
        phone: "(555) 123-4567",
        hours: "5:00 PM - 2:00 AM",
        special: "Happy Hour 5-7PM",
      },
      {
        id: 'mock2',
        name: "The Underground",
        rating: 4.6,
        popularity: 4,
        crowd: "College",
        vibe: "Dive Bar",
        music: "Rock/Indie",
        price: "$",
        distance: "0.8 mi",
        coordinate: {
          latitude: coords.latitude - 0.001,
          longitude: coords.longitude + 0.002,
        },
        address: "456 College St, Downtown",
        phone: "(555) 234-5678",
        hours: "4:00 PM - 1:00 AM",
        special: "Live Music Tonight",
      },
      {
        id: 'mock3',
        name: "Skyline Rooftop",
        rating: 4.9,
        popularity: 5,
        crowd: "Luxury",
        vibe: "Rooftop Bar",
        music: "Jazz/Lounge",
        price: "$$$",
        distance: "1.2 mi",
        coordinate: {
          latitude: coords.latitude + 0.002,
          longitude: coords.longitude - 0.001,
        },
        address: "789 Luxury Blvd, Downtown",
        phone: "(555) 345-6789",
        hours: "6:00 PM - 2:00 AM",
        special: "Craft Cocktails",
      }
    ];
    
    return mockBars;
  };

  const calculatePopularity = (rating, userRatingsTotal) => {
    if (!rating) return 1;
    if (rating >= 4.5 && userRatingsTotal > 100) return 5;
    if (rating >= 4.0 && userRatingsTotal > 50) return 4;
    if (rating >= 3.5 && userRatingsTotal > 20) return 3;
    if (rating >= 3.0) return 2;
    return 1;
  };

  const calculateDistance = (userCoords, barCoords) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (barCoords.lat - userCoords.latitude) * Math.PI / 180;
    const dLon = (barCoords.lng - userCoords.longitude) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userCoords.latitude * Math.PI / 180) * Math.cos(barCoords.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance < 1 ? `${(distance * 5280).toFixed(0)} ft` : `${distance.toFixed(1)} mi`;
  };

  const getCrowdType = (types) => {
    if (types.includes('night_club')) return 'Party';
    if (types.includes('restaurant')) return 'Mixed';
    return 'Local';
  };

  const getVibeType = (types) => {
    if (types.includes('night_club')) return 'Nightclub';
    if (types.includes('restaurant')) return 'Bar & Grill';
    return 'Neighborhood Bar';
  };

  const getMusicType = (types) => {
    if (types.includes('night_club')) return 'EDM/Hip-Hop';
    if (types.includes('restaurant')) return 'Mixed';
    return 'Rock/Indie';
  };

  const getPriceLevel = (level) => {
    switch (level) {
      case 1: return '$';
      case 2: return '$$';
      case 3: return '$$$';
      case 4: return '$$$$';
      default: return '$$';
    }
  };

  const getHours = (openingHours) => {
    if (!openingHours || !openingHours.open_now) return 'Hours vary';
    return 'Open now';
  };

  const getSpecialOffer = (types) => {
    if (types.includes('night_club')) return 'DJ Set Tonight';
    if (types.includes('restaurant')) return 'Happy Hour';
    return 'Live Music';
  };

  const getDrinkEmojis = (popularity) => {
    return '🍸'.repeat(popularity);
  };

  const getPopularityColor = (popularity) => {
    const colors = {
      1: '#FF6B6B', // Red for less popular
      2: '#FFB347', // Orange
      3: '#FFD93D', // Yellow
      4: '#4ECDC4', // Teal
      5: '#FF6B9D', // Pink for most popular
    };
    return colors[popularity] || '#FF6B6B';
  };

  const handleMarkerPress = (bar) => {
    setSelectedBar(bar);
    setShowBarDetails(true);
  };

  const handleLocationPress = () => {
    if (location) {
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  const renderBarDetailsModal = () => (
    <Modal
      visible={showBarDetails}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowBarDetails(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['rgba(255, 107, 157, 0.1)', 'rgba(78, 205, 196, 0.1)']}
            style={styles.modalGradient}
          >
            {selectedBar && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedBar.name}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowBarDetails(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.ratingRow}>
                    <Text style={styles.popularityEmojis}>
                      {getDrinkEmojis(selectedBar.popularity)}
                    </Text>
                    <Text style={styles.ratingText}>★ {selectedBar.rating}</Text>
                  </View>

                  <View style={styles.barTags}>
                    <View style={[styles.tag, { backgroundColor: '#FF6B9D20' }]}>
                      <Text style={[styles.tagText, { color: '#FF6B9D' }]}>
                        {selectedBar.crowd}
                      </Text>
                    </View>
                    <View style={[styles.tag, { backgroundColor: '#4ECDC420' }]}>
                      <Text style={[styles.tagText, { color: '#4ECDC4' }]}>
                        {selectedBar.vibe}
                      </Text>
                    </View>
                    <View style={[styles.tag, { backgroundColor: '#45B7D120' }]}>
                      <Text style={[styles.tagText, { color: '#45B7D1' }]}>
                        {selectedBar.music}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>📍 {selectedBar.address}</Text>
                    <Text style={styles.infoLabel}>📞 {selectedBar.phone}</Text>
                    <Text style={styles.infoLabel}>🕒 {selectedBar.hours}</Text>
                    <Text style={styles.infoLabel}>💰 {selectedBar.price}</Text>
                  </View>

                  <View style={styles.specialContainer}>
                    <Text style={styles.specialText}>🎉 {selectedBar.special}</Text>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.primaryButton}>
                      <LinearGradient
                        colors={['#FF6B9D', '#FF8E53']}
                        style={styles.primaryButtonGradient}
                      >
                        <Text style={styles.primaryButtonText}>🎯 Check In</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonText}>📞 Call</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#0A0A0A', '#1A1A1A']}
          style={styles.loadingGradient}
        >
          <ActivityIndicator size="large" color="#FF6B9D" />
          <Text style={styles.loadingText}>Finding bars near you...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      
      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onRegionChangeComplete={setRegion}
      >
        {bars.map((bar) => (
          <Marker
            key={bar.id}
            coordinate={bar.coordinate}
            onPress={() => handleMarkerPress(bar)}
          >
            <View style={styles.markerContainer}>
              <View style={[
                styles.markerBackground,
                { backgroundColor: getPopularityColor(bar.popularity) }
              ]}>
                <Text style={styles.markerEmoji}>
                  {getDrinkEmojis(bar.popularity)}
                </Text>
              </View>
              <View style={[
                styles.markerArrow,
                { borderTopColor: getPopularityColor(bar.popularity) }
              ]} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={['rgba(10, 10, 10, 0.9)', 'rgba(26, 26, 26, 0.9)']}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>🗺️ Discover Bars</Text>
          <Text style={styles.headerSubtitle}>Tap markers to see details</Text>
        </LinearGradient>
      </View>

      {/* Location Button */}
      <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
        <LinearGradient
          colors={['#FF6B9D', '#FF8E53']}
          style={styles.locationButtonGradient}
        >
          <Text style={styles.locationButtonText}>📍</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Legend */}
      <View style={styles.legend}>
        <LinearGradient
          colors={['rgba(10, 10, 10, 0.9)', 'rgba(26, 26, 26, 0.9)']}
          style={styles.legendGradient}
        >
          <Text style={styles.legendTitle}>Popularity Rating</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <Text style={styles.legendEmojis}>🍸🍸🍸🍸🍸</Text>
              <Text style={styles.legendText}>Most Popular</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendEmojis}>🍸🍸🍸🍸</Text>
              <Text style={styles.legendText}>Very Popular</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendEmojis}>🍸🍸🍸</Text>
              <Text style={styles.legendText}>Popular</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendEmojis}>🍸🍸</Text>
              <Text style={styles.legendText}>Somewhat</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendEmojis}>🍸</Text>
              <Text style={styles.legendText}>Less Popular</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {renderBarDetailsModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
    marginTop: 20,
  },
  map: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  headerGradient: {
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
  },
  locationButton: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  locationButtonGradient: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonText: {
    fontSize: 24,
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  legendGradient: {
    padding: 15,
  },
  legendTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    alignItems: 'center',
  },
  legendEmojis: {
    fontSize: 12,
    marginBottom: 5,
  },
  legendText: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    textAlign: 'center',
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerBackground: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerEmoji: {
    fontSize: 12,
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: height * 0.7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  modalBody: {
    gap: 15,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularityEmojis: {
    fontSize: 20,
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFD93D',
  },
  barTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  infoSection: {
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
  },
  specialContainer: {
    backgroundColor: 'rgba(255, 214, 61, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 61, 0.3)',
  },
  specialText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFD93D',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  primaryButton: {
    flex: 2,
    borderRadius: 15,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF6B9D',
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6B9D',
  },
});

export default MapScreen; 