import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const BarhopperDashboard = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for trendy bars
  const trendingBars = [
    {
      id: 1,
      name: "Neon Dreams",
      rating: 4.8,
      crowd: "Young Professional",
      vibe: "Cocktail Lounge",
      music: "House/Electronic",
      price: "$$",
      distance: "0.3 mi",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
      isOpen: true,
      special: "Happy Hour 5-7PM"
    },
    {
      id: 2,
      name: "The Underground",
      rating: 4.6,
      crowd: "College",
      vibe: "Dive Bar",
      music: "Rock/Indie",
      price: "$",
      distance: "0.8 mi",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      isOpen: true,
      special: "Live Music Tonight"
    },
    {
      id: 3,
      name: "Skyline Rooftop",
      rating: 4.9,
      crowd: "Luxury",
      vibe: "Rooftop Bar",
      music: "Jazz/Lounge",
      price: "$$$",
      distance: "1.2 mi",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      isOpen: true,
      special: "Craft Cocktails"
    },
    {
      id: 4,
      name: "Pulse Nightclub",
      rating: 4.4,
      crowd: "Party",
      vibe: "Nightclub",
      music: "EDM/Hip-Hop",
      price: "$$",
      distance: "0.5 mi",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      isOpen: true,
      special: "DJ Set Tonight"
    }
  ];

  const filters = [
    { id: 'all', label: 'All', color: '#FF6B9D' },
    { id: 'college', label: 'College', color: '#4ECDC4' },
    { id: 'professional', label: 'Professional', color: '#45B7D1' },
    { id: 'luxury', label: 'Luxury', color: '#FFD93D' },
    { id: 'party', label: 'Party', color: '#FF6B6B' },
  ];

  const renderFilterButton = (filter) => (
    <TouchableOpacity
      key={filter.id}
      style={[
        styles.filterButton,
        selectedFilter === filter.id && styles.filterButtonActive,
        { borderColor: filter.color }
      ]}
      onPress={() => setSelectedFilter(filter.id)}
    >
      <Text style={[
        styles.filterText,
        selectedFilter === filter.id && { color: filter.color }
      ]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  const renderBarCard = (bar) => (
    <TouchableOpacity 
      key={bar.id} 
      style={styles.barCard}
      onPress={() => navigation.navigate('BarDetails', { bar })}
    >
      <LinearGradient
        colors={['rgba(255, 107, 157, 0.1)', 'rgba(78, 205, 196, 0.1)']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Image source={{ uri: bar.image }} style={styles.barImage} />
          <View style={styles.cardOverlay}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {bar.rating}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{bar.price}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.barName}>{bar.name}</Text>
          <Text style={styles.barDistance}>{bar.distance}</Text>
          
          <View style={styles.barTags}>
            <View style={[styles.tag, { backgroundColor: '#FF6B9D20' }]}>
              <Text style={[styles.tagText, { color: '#FF6B9D' }]}>{bar.crowd}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#4ECDC420' }]}>
              <Text style={[styles.tagText, { color: '#4ECDC4' }]}>{bar.vibe}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#45B7D120' }]}>
              <Text style={[styles.tagText, { color: '#45B7D1' }]}>{bar.music}</Text>
            </View>
          </View>
          
          <View style={styles.specialContainer}>
            <Text style={styles.specialText}>🎉 {bar.special}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0A0A0A', '#1A1A1A']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>Barhopper! 🍸</Text>
          <Text style={styles.subtitle}>Discover tonight's hottest spots</Text>
        </View>
        
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map(renderFilterButton)}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Trending Tonight</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {trendingBars.map(renderBarCard)}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#FF6B9D', '#FF8E53']}
              style={styles.actionGradient}
            >
              <Text style={styles.actionIcon}>🎯</Text>
              <Text style={styles.actionText}>Find Nearby</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#4ECDC4', '#44A08D']}
              style={styles.actionGradient}
            >
              <Text style={styles.actionIcon}>🎵</Text>
              <Text style={styles.actionText}>Live Music</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#45B7D1', '#96C93D']}
              style={styles.actionGradient}
            >
              <Text style={styles.actionIcon}>🎉</Text>
              <Text style={styles.actionText}>Events</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FF6B9D',
    marginTop: 4,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 107, 157, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B9D',
  },
  profileIcon: {
    fontSize: 24,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#888',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
  seeAllText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6B9D',
  },
  barCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 157, 0.3)',
  },
  cardHeader: {
    position: 'relative',
  },
  barImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  cardOverlay: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    gap: 10,
  },
  ratingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  ratingText: {
    color: '#FFD93D',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  priceContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  priceText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  cardContent: {
    padding: 20,
  },
  barName: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 5,
  },
  barDistance: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    marginBottom: 15,
  },
  barTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  actionGradient: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
});

export default BarhopperDashboard; 