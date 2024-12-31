import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';

const products = [
  {
    id: '1',
    name: 'Summer T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500'
  },
  {
    id: '2',
    name: 'Casual Shirt',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
  },
  {
    id: '3',
    name: 'Denim Jacket',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
  },
  {
    id: '4',
    name: 'Classic Polo',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500'
  }
];

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2.5;

export const ClothingCategories = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trending Now</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
            </View>
            <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    color: '#666',
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  productCard: {
    width: ITEM_WIDTH,
    marginHorizontal: 4,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.2,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: 14,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
});