import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Package2, Heart, Gift, Headphones } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const ProfileButtons = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Orders')}
        >
          <Package2 size={24} color="#6366f1" />
          <Text style={styles.buttonText}>Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <Heart size={24} color="#9b87f5" />
          <Text style={styles.buttonText}>Wishlist</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Gift size={24} color="#6366f1" />
          <Text style={styles.buttonText}>Coupons</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Headphones size={24} color="#6366f1" />
          <Text style={styles.buttonText}>Help Center</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  button: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  buttonText: {
    fontSize: 14,
    color: '#374151',
  },
});