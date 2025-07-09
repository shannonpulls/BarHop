// API Configuration
export const API_CONFIG = {
  // Replace with your actual Google Places API key
  // Get one from: https://console.cloud.google.com/apis/credentials
  GOOGLE_PLACES_API_KEY: 'qZTNZJFniGZ1bTAP38IgJkVxNvQ=',
  
  // API endpoints
  GOOGLE_PLACES_BASE_URL: 'https://maps.googleapis.com/maps/api/place',
  
  // Search radius in meters
  SEARCH_RADIUS: 2000,
  
  // Bar types to search for
  BAR_TYPES: ['bar'],
};

// Instructions for getting a Google Places API key:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable the Places API
// 4. Go to Credentials and create an API key
// 5. Restrict the API key to your app's bundle ID
// 6. Replace 'YOUR_GOOGLE_PLACES_API_KEY' above with your actual key 