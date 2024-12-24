import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Bell, UserCircle, Search, ShoppingBag } from 'lucide-react-native';
import { LocationButton } from './LocationButton';
import { SearchBar } from './SearchBar';

export const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const renderDefaultHeader = () => (
    <>
      <View style={styles.topRow}>
        <LocationButton />
        <View style={styles.iconContainer}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Bell size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <UserCircle size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar />
    </>
  );

  const renderInnerPageHeader = (title: string) => (
    <View style={styles.innerHeader}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer}>
        {route.name !== 'Search' && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Search size={20} color="#000" />
          </TouchableOpacity>
        )}
        {route.name !== 'Cart' && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <ShoppingBag size={20} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const getHeaderTitle = () => {
    switch (route.name) {
      case 'Cart':
        return 'Shopping Cart';
      case 'Profile':
        return 'My Profile';
      case 'Wishlist':
        return 'My Wishlist';
      case 'Search':
        return 'Search';
      case 'ProductDetails':
        return 'Product Details';
      default:
        return '';
    }
  };

  return (
    <View style={styles.header}>
      {['Home', 'Categories'].includes(route.name) 
        ? renderDefaultHeader()
        : renderInnerPageHeader(getHeaderTitle())}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
});