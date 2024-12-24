import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/contexts/CartContext';
import { NetworkProvider } from './src/contexts/NetworkContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { Platform } from 'react-native';
import { AppRegistry } from 'react-native';

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