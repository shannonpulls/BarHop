# Apple Authentication Setup Guide

## Prerequisites

- Apple Developer Account ($99/year)
- Xcode installed (for iOS development)

## Step 1: Create App ID

1. Go to [Apple Developer Console](https://developer.apple.com/account/)
2. Navigate to "Certificates, Identifiers & Profiles"
3. Click "Identifiers" → "+" to create new identifier
4. Select "App IDs" → "Continue"
5. Choose "App" → "Continue"

## Step 2: Configure App ID

1. **Description**: `BarHop App`
2. **Bundle ID**: `com.yourcompany.barhop` (must match app.config.js)
3. **Capabilities**: Scroll down and check "Sign In with Apple"
4. Click "Continue" → "Register"

## Step 3: Update app.config.js

Make sure your `app.config.js` has the correct bundle identifier:

```javascript
ios: {
  supportsTablet: true,
  bundleIdentifier: "com.yourcompany.barhop" // Must match Apple Developer Console
},
```

## Step 4: Build for iOS

Apple Sign-In only works on physical iOS devices or iOS simulators:

```bash
# Build for iOS simulator
npx expo run:ios

# Or build for physical device
npx expo run:ios --device
```

## Step 5: Test Apple Sign-In

1. Run the app on iOS device/simulator
2. Navigate to Barhopper Registration
3. Tap "Continue with Apple"
4. You should see the Apple sign-in popup
5. Sign in with your Apple ID

## Troubleshooting

- **"Sign In with Apple not available"**: Make sure you're testing on iOS
- **"Invalid bundle ID"**: Check that bundle ID matches exactly
- **"Capability not enabled"**: Make sure "Sign In with Apple" is checked in App ID

## Notes

- Apple Sign-In only works on iOS devices (iPhone, iPad, Mac)
- It won't work on Android devices
- For production, you'll need to submit your app to the App Store 