# Mobile App

This is the React Native version of our web application. All components have been converted from web to mobile while maintaining the same functionality.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the app:
```bash
npm start
```

## Structure

The app follows the same structure as the web version but with React Native components:

- components/
  - address/
  - banners/
  - cart/
  - categories/
  - layout/
  - product/
  - ui/
- contexts/
- pages/
- hooks/
- utils/

## Key Differences from Web Version

1. Uses React Native components instead of HTML elements
2. Tailwind CSS classes replaced with React Native StyleSheet
3. CSS animations replaced with React Native Animated API
4. Touch interactions instead of mouse events
5. Platform-specific UI components