# BarHop - Night Out App

A React Native app for bar registration and barhopping with social authentication.

## Features

- **Bar Registration**: Bars can register with their details
- **Barhopper Registration**: Users can sign up with Google or Apple accounts
- **Modern UI**: Dark theme with smooth animations
- **Social Authentication**: Google and Apple Sign-In integration

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Google Authentication Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add your app's bundle identifier:
   - iOS: `com.yourcompany.barhop`
   - Android: `com.yourcompany.barhop`
6. Copy the Client ID and replace `YOUR_GOOGLE_CLIENT_ID` in `App.js`

### 3. Apple Authentication Setup

1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Create an App ID with Sign In with Apple capability
3. Configure your app's bundle identifier
4. Apple Sign-In will work automatically on iOS devices

### 4. Update App Configuration

Update the bundle identifiers in `app.config.js` to match your actual app:

```javascript
ios: {
  bundleIdentifier: "com.yourcompany.barhop"
},
android: {
  package: "com.yourcompany.barhop"
}
```

### 5. Run the App

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## App Flow

1. **Welcome Screen**: App logo and "Let's Get Started" button
2. **Account Type Selection**: Choose between Bar or Barhopper registration
3. **Bar Registration**: Form for bar details (name, address, email, description)
4. **Barhopper Registration**: Google and Apple sign-in options
5. **Success Screen**: Welcome message with user information

## Current Status

- ✅ Welcome screen with animations
- ✅ Account type selection
- ✅ Bar registration form
- ✅ Barhopper registration with Google/Apple sign-in UI
- ✅ Success screen
- ⏳ Backend integration
- ⏳ User authentication flow
- ⏳ Bar listing and search
- ⏳ User profiles

## Next Steps

1. Set up Google and Apple authentication credentials
2. Implement backend API for user registration
3. Add user profile management
4. Create bar listing and search functionality
5. Add reviews and ratings system
6. Implement maps integration

## Dependencies

- React Native
- Expo
- React Native Reanimated
- Expo Auth Session
- Expo Apple Authentication
- Google Sign-In
- Poppins Font

## Development

This app is built with Expo and React Native. The authentication is handled through Expo's authentication libraries for a seamless experience across platforms. 