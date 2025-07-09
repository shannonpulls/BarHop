# Google Authentication Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project: `BarHop App`
4. Click "Create"

## Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google Identity" and "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: BarHop
   - User support email: your email
   - Developer contact email: your email
   - Save and continue through the steps

## Step 4: Create OAuth Client ID

1. Application type: "Mobile application"
2. Name: "BarHop Mobile App"
3. For iOS: Add bundle ID `com.yourcompany.barhop`
4. For Android: Add package name `com.yourcompany.barhop`
5. Click "Create"

## Step 5: Get Your Client ID

1. Copy the generated Client ID (looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
2. Replace `YOUR_GOOGLE_CLIENT_ID` in `App.js` with your actual Client ID

## Step 6: Update App.js

Replace this line in your `App.js`:
```javascript
client_id=YOUR_GOOGLE_CLIENT_ID&
```

With your actual client ID:
```javascript
client_id=123456789-abcdefghijklmnop.apps.googleusercontent.com&
```

## Testing Google Sign-In

1. Run your app: `npm start`
2. Navigate to Barhopper Registration
3. Tap "Continue with Google"
4. You should see the Google sign-in popup
5. Sign in with your Google account

## Troubleshooting

- **"Invalid client" error**: Make sure your bundle ID matches exactly
- **"Redirect URI mismatch"**: Check that your app scheme is set to `barhop`
- **"API not enabled"**: Make sure Google Identity API is enabled 