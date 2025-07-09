# 🔐 Complete Authentication Setup Guide

This guide will walk you through setting up both Google and Apple authentication for your BarHop app.

## 🚀 Quick Setup (Recommended)

Run the automated setup script:

```bash
npm run setup-auth
```

This will prompt you for your credentials and automatically update the configuration files.

## 📋 Manual Setup

### Step 1: Google Authentication

#### 1.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "BarHop App"
3. Enable billing (required for OAuth)

#### 1.2 Enable APIs
1. Go to "APIs & Services" → "Library"
2. Search for "Google Identity" and enable it
3. Search for "Google+ API" and enable it

#### 1.3 Configure OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: BarHop
   - User support email: your email
   - Developer contact email: your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (your email)

#### 1.4 Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Mobile application"
4. Name: "BarHop Mobile App"
5. Add your bundle ID: `com.yourcompany.barhop`
6. Copy the Client ID and Client Secret

#### 1.5 Update Configuration
Edit `config/auth.js`:
```javascript
export const AUTH_CONFIG = {
  GOOGLE: {
    CLIENT_ID: 'your-actual-client-id.apps.googleusercontent.com',
    CLIENT_SECRET: 'your-actual-client-secret',
  },
  // ... rest of config
};
```

### Step 2: Apple Authentication

#### 2.1 Apple Developer Account
- Requires paid Apple Developer account ($99/year)
- Sign up at [developer.apple.com](https://developer.apple.com/)

#### 2.2 Create App ID
1. Go to "Certificates, Identifiers & Profiles"
2. Click "Identifiers" → "+"
3. Choose "App IDs" → "App"
4. Configure:
   - Description: BarHop App
   - Bundle ID: `com.yourcompany.barhop`
   - Capabilities: Check "Sign In with Apple"

#### 2.3 Update App Configuration
Make sure `app.config.js` has the correct bundle identifier:
```javascript
ios: {
  bundleIdentifier: "com.yourcompany.barhop"
},
android: {
  package: "com.yourcompany.barhop"
}
```

## 🧪 Testing

### Test Google Sign-In
1. Run: `npm start`
2. Navigate to Barhopper Registration
3. Tap "Continue with Google"
4. Sign in with your Google account

### Test Apple Sign-In
1. Run: `npx expo run:ios` (iOS only)
2. Navigate to Barhopper Registration
3. Tap "Continue with Apple"
4. Sign in with your Apple ID

## 🔧 Troubleshooting

### Google Sign-In Issues
- **"Invalid client"**: Check bundle ID matches exactly
- **"Redirect URI mismatch"**: Verify scheme is set to `barhop`
- **"API not enabled"**: Enable Google Identity API

### Apple Sign-In Issues
- **"Sign In with Apple not available"**: Test on iOS device/simulator
- **"Invalid bundle ID"**: Check App ID configuration
- **"Capability not enabled"**: Enable "Sign In with Apple" in App ID

### General Issues
- **Metro bundler errors**: Clear cache with `npx expo start --clear`
- **Build errors**: Check all dependencies are installed
- **Authentication fails**: Verify credentials are correct

## 📱 Platform Support

| Platform | Google Sign-In | Apple Sign-In |
|----------|----------------|---------------|
| iOS      | ✅ Yes         | ✅ Yes        |
| Android  | ✅ Yes         | ❌ No         |
| Web      | ✅ Yes         | ❌ No         |

## 🔒 Security Notes

- Never commit real credentials to version control
- Use environment variables for production
- Keep your Client Secret secure
- Regularly rotate your credentials

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all configuration steps are completed
3. Test on a physical device if possible
4. Check Expo and React Native documentation

## 🎉 Success!

Once authentication is working, you'll see:
- User profile picture (Google)
- User name and email
- User ID
- Success message

Your users can now sign up and sign in to your BarHop app! 