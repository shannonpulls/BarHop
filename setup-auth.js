#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 BarHop Authentication Setup\n');

console.log('This script will help you configure Google and Apple authentication for your BarHop app.\n');

console.log('📋 Prerequisites:');
console.log('1. Google Cloud Console account');
console.log('2. Apple Developer account (for Apple Sign-In)');
console.log('3. Your app bundle identifier\n');

rl.question('Enter your Google Client ID: ', (googleClientId) => {
  rl.question('Enter your Google Client Secret: ', (googleClientSecret) => {
    rl.question('Enter your app bundle identifier (e.g., com.yourcompany.barhop): ', (bundleId) => {
      
      // Update auth config
      const authConfigPath = path.join(__dirname, 'config', 'auth.js');
      let authConfig = fs.readFileSync(authConfigPath, 'utf8');
      
      authConfig = authConfig.replace('YOUR_GOOGLE_CLIENT_ID', googleClientId);
      authConfig = authConfig.replace('YOUR_GOOGLE_CLIENT_SECRET', googleClientSecret);
      authConfig = authConfig.replace('com.yourcompany.barhop', bundleId);
      
      fs.writeFileSync(authConfigPath, authConfig);
      
      // Update app.config.js
      const appConfigPath = path.join(__dirname, 'app.config.js');
      let appConfig = fs.readFileSync(appConfigPath, 'utf8');
      
      appConfig = appConfig.replace(/bundleIdentifier: "com\.yourcompany\.barhop"/g, `bundleIdentifier: "${bundleId}"`);
      appConfig = appConfig.replace(/package: "com\.yourcompany\.barhop"/g, `package: "${bundleId}"`);
      
      fs.writeFileSync(appConfigPath, appConfig);
      
      console.log('\n✅ Configuration updated successfully!');
      console.log('\n📝 Next steps:');
      console.log('1. For Google Sign-In: Make sure your bundle ID matches in Google Cloud Console');
      console.log('2. For Apple Sign-In: Update your App ID in Apple Developer Console');
      console.log('3. Run: npm start to test your app');
      
      rl.close();
    });
  });
}); 