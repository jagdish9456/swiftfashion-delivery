import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FadeView } from '../animations/FadeView';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brand: string;
};

export const ProductCard = ({ id, name, price, image, description, brand }: ProductCardProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ProductDetails', { id });
  };

  return (
    <FadeView duration={400}>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image }} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.brand} numberOfLines={1}>{brand}</Text>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </FadeView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 8,
  },
  brand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});