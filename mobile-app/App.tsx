import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/contexts/CartContext';
import { NetworkProvider } from './src/contexts/NetworkContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { Platform, UIManager, BackHandler } from 'react-native';
import { AppRegistry } from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Register the app for non-web platforms
if (Platform.OS !== 'web') {
  AppRegistry.registerComponent('main', () => App);
}

const App = () => {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      if (navigationRef.current?.getCurrentRoute()?.name) {
        if (Platform.OS === 'web') {
          window.scrollTo(0, 0);
        }
      }
    });

    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (navigationRef.current?.canGoBack()) {
          navigationRef.current?.goBack();
          return true;
        }
        return false;
      });

      return () => {
        backHandler.remove();
        unsubscribe();
      };
    }

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <NetworkProvider>
        <CartProvider>
          <NavigationContainer ref={navigationRef}>
            <AppNavigator />
          </NavigationContainer>
        </CartProvider>
      </NetworkProvider>
    </SafeAreaProvider>
  );
};

export default App;