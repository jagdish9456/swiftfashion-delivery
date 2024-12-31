import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react-native';
import { ShimmerLoader } from '../common/ShimmerLoader';

export const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const isActive = (routeName: string) => route.name === routeName;

  const handleNavigation = async (routeName: string) => {
    if (route.name === routeName) return;
    
    setIsLoading(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    try {
      await navigation.navigate(routeName);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        {Array(5).fill(0).map((_, index) => (
          <ShimmerLoader key={index} width={50} height={50} />
        ))}
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => handleNavigation('Home')}
        disabled={isLoading}
      >
        <Home size={24} color={isActive('Home') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Home') && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => handleNavigation('Categories')}
        disabled={isLoading}
      >
        <Search size={24} color={isActive('Categories') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Categories') && styles.activeLabel]}>
          Categories
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => handleNavigation('Cart')}
        disabled={isLoading}
      >
        <ShoppingBag size={24} color={isActive('Cart') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Cart') && styles.activeLabel]}>
          Cart
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => handleNavigation('Wishlist')}
        disabled={isLoading}
      >
        <Heart size={24} color={isActive('Wishlist') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Wishlist') && styles.activeLabel]}>
          Wishlist
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => handleNavigation('Profile')}
        disabled={isLoading}
      >
        <User size={24} color={isActive('Profile') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Profile') && styles.activeLabel]}>
          Profile
        </Text>
      </TouchableOpacity>
    </Animated.View>
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
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    }),
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeLabel: {
    color: '#000',
    fontWeight: '500',
  },
});