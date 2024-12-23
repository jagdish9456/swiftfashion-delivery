import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react-native';

export const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName: string) => route.name === routeName;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Home')}
      >
        <Home size={24} color={isActive('Home') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Home') && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Categories')}
      >
        <Search size={24} color={isActive('Categories') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Categories') && styles.activeLabel]}>
          Categories
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Cart')}
      >
        <ShoppingBag size={24} color={isActive('Cart') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Cart') && styles.activeLabel]}>
          Cart
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Wishlist')}
      >
        <Heart size={24} color={isActive('Wishlist') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Wishlist') && styles.activeLabel]}>
          Wishlist
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Profile')}
      >
        <User size={24} color={isActive('Profile') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Profile') && styles.activeLabel]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeLabel: {
    color: '#000',
  },
});