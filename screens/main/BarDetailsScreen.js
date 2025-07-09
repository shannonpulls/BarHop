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

const { width, height } = Dimensions.get('window');

const BarDetailsScreen = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock bar data - in real app this would come from route.params
  const barData = {
    id: 1,
    name: "Neon Dreams",
    rating: 4.8,
    reviews: 127,
    crowd: "Young Professional",
    vibe: "Cocktail Lounge",
    music: "House/Electronic",
    price: "$$",
    distance: "0.3 mi",
    address: "123 Nightlife Ave, Downtown",
    phone: "(555) 123-4567",
    hours: "5:00 PM - 2:00 AM",
    images: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    ],
    specials: [
      "Happy Hour 5-7PM: 50% off cocktails",
      "Live DJ every Friday",
      "Craft beer selection",
      "Outdoor seating available"
    ],
    reviews_data: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        comment: "Amazing atmosphere and great cocktails! The neon lighting is perfect for photos.",
        date: "2 days ago"
      },
      {
        id: 2,
        user: "Mike R.",
        rating: 4,
        comment: "Good vibes and friendly staff. Music was on point tonight.",
        date: "1 week ago"
      },
      {
        id: 3,
        user: "Jessica L.",
        rating: 5,
        comment: "Perfect spot for date night. The rooftop view is incredible!",
        date: "2 weeks ago"
      }
    ]
  };

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={[styles.star, i <= rating && styles.starFilled]}>
          {i <= rating ? '★' : '☆'}
        </Text>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderTabButton = (tabId, label, icon) => (
    <TouchableOpacity
      key={tabId}
      style={[styles.tabButton, selectedTab === tabId && styles.tabButtonActive]}
      onPress={() => setSelectedTab(tabId)}
    >
      <Text style={styles.tabIcon}>{icon}</Text>
      <Text style={[styles.tabLabel, selectedTab === tabId && styles.tabLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>📍 Location & Hours</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoValue}>{barData.address}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Hours:</Text>
          <Text style={styles.infoValue}>{barData.hours}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{barData.phone}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>🎉 Special Features</Text>
        {barData.specials.map((special, index) => (
          <View key={index} style={styles.specialItem}>
            <Text style={styles.specialText}>• {special}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderReviews = () => (
    <View style={styles.tabContent}>
      {barData.reviews_data.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewUser}>{review.user}</Text>
            <View style={styles.reviewRating}>
              {renderStarRating(review.rating)}
            </View>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
      ))}
    </View>
  );

  const renderPhotos = () => (
    <View style={styles.tabContent}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {barData.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.photoItem} />
        ))}
      </ScrollView>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      
      {/* Header Image */}
      <View style={styles.headerImageContainer}>
        <Image source={{ uri: barData.images[0] }} style={styles.headerImage} />
        <LinearGradient
          colors={['transparent', 'rgba(10, 10, 10, 0.8)']}
          style={styles.headerOverlay}
        />
        
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        {/* Header Info */}
        <View style={styles.headerInfo}>
          <Text style={styles.barName}>{barData.name}</Text>
          <View style={styles.headerMeta}>
            {renderStarRating(barData.rating)}
            <Text style={styles.reviewCount}>({barData.reviews} reviews)</Text>
          </View>
          <View style={styles.headerTags}>
            <View style={[styles.tag, { backgroundColor: '#FF6B9D20' }]}>
              <Text style={[styles.tagText, { color: '#FF6B9D' }]}>{barData.crowd}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#4ECDC420' }]}>
              <Text style={[styles.tagText, { color: '#4ECDC4' }]}>{barData.vibe}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#45B7D120' }]}>
              <Text style={[styles.tagText, { color: '#45B7D1' }]}>{barData.music}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
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

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {renderTabButton('overview', 'Overview', '📋')}
        {renderTabButton('reviews', 'Reviews', '⭐')}
        {renderTabButton('photos', 'Photos', '📸')}
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'reviews' && renderReviews()}
        {selectedTab === 'photos' && renderPhotos()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  headerImageContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  headerInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  barName: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 10,
  },
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  star: {
    fontSize: 16,
    color: '#888',
    marginRight: 2,
  },
  starFilled: {
    color: '#FFD93D',
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
  },
  headerTags: {
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
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 107, 157, 0.3)',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#888',
  },
  tabLabelActive: {
    color: '#FF6B9D',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContent: {
    paddingVertical: 20,
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6B9D',
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    flex: 1,
  },
  specialItem: {
    marginBottom: 8,
  },
  specialText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FFD93D',
  },
  reviewCard: {
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 157, 0.3)',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewUser: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6B9D',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 20,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
  },
  photoItem: {
    width: width * 0.7,
    height: 200,
    borderRadius: 15,
    marginRight: 15,
  },
});

export default BarDetailsScreen; 