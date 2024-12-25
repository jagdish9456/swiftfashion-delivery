import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Home, Search, ShoppingBag, Heart, User, MessageSquareMore } from 'lucide-react-native';

export const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName: string) => route.name === routeName;

  const handleCategoryPress = () => {
    navigation.navigate('Categories');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Home')}
      >
        <Home size={20} color={isActive('Home') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Home') && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={handleCategoryPress}
      >
        <Search size={20} color={isActive('Categories') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Categories') && styles.activeLabel]}>
          Categories
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Cart')}
      >
        <ShoppingBag size={20} color={isActive('Cart') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('Cart') && styles.activeLabel]}>
          Cart
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('AIChat')}
      >
        <MessageSquareMore size={20} color={isActive('AIChat') ? '#000' : '#666'} />
        <Text style={[styles.label, isActive('AIChat') && styles.activeLabel]}>
          Q-AI
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Profile')}
      >
        <User size={20} color={isActive('Profile') ? '#000' : '#666'} />
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
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    color: '#666',
  },
  activeLabel: {
    color: '#000',
  },
});