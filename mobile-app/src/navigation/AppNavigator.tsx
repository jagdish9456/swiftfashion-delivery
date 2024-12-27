import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Categories } from '../screens/Categories';
import { ProductDetails } from '../screens/ProductDetails';
import { Cart } from '../screens/Cart';
import { Profile } from '../screens/Profile';
import { Wishlist } from '../screens/Wishlist';
import { Notifications } from '../screens/Notifications';
import { Search } from '../screens/Search';
import { Orders } from '../screens/Orders';
import { ProductList } from '../screens/ProductList';
import { SetLocation } from '../screens/SetLocation';
import { AIVoiceAgent } from '../screens/AIVoiceAgent';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      id="app-navigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen name="AIVoiceAgent" component={AIVoiceAgent} />
    </Stack.Navigator>
  );
};