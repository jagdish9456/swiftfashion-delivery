import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/contexts/CartContext';
import { NetworkProvider } from './src/contexts/NetworkContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { AppRegistry } from 'react-native';

const App = () => {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      // Reset scroll position on route change
      if (navigationRef.current?.getCurrentRoute()?.name) {
        // Scroll to top logic
        window.scrollTo(0, 0);
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

// Register the main component
AppRegistry.registerComponent('main', () => App);

export default App;