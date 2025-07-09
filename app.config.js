export default {
  expo: {
    name: "BarHop",
    slug: "barhop",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#18181b"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.barhop"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#18181b"
      },
      package: "com.yourcompany.barhop"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    scheme: "barhop",
    plugins: [
      "expo-apple-authentication"
    ]
  }
}; 