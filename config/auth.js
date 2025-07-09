// Authentication Configuration
// Replace these values with your actual credentials from Google Cloud Console

export const AUTH_CONFIG = {
  GOOGLE: {
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual Google Client ID
    CLIENT_SECRET: 'YOUR_GOOGLE_CLIENT_SECRET', // Replace with your actual Google Client Secret
  },
  APPLE: {
    // Apple authentication is handled automatically by expo-apple-authentication
    // No additional configuration needed beyond Apple Developer Console setup
  },
  APP: {
    SCHEME: 'barhop',
    BUNDLE_ID: 'com.yourcompany.barhop',
  }
};

// Instructions:
// 1. Go to Google Cloud Console: https://console.cloud.google.com/
// 2. Create a project and enable Google Identity API
// 3. Create OAuth 2.0 credentials for mobile app
// 4. Copy your Client ID and Client Secret here
// 5. Update the bundle ID to match your actual app identifier 