import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ProductCard } from '../product/ProductCard';

const products = [
  {
    id: '1',
    name: 'Designer Dress',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500',
    description: 'Elegant designer dress for special occasions',
    brand: 'LuxeFashion'
  },
  {
    id: '2',
    name: 'Formal Suit',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500',
    description: 'Classic formal suit for professional settings',
    brand: 'ElegantWear'
  },
  {
    id: '3',
    name: 'Summer Collection',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
    description: 'Light and breezy summer collection pieces',
    brand: 'SummerStyle'
  }
];

export const TopChoices = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Choices For You</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <ProductCard {...product} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  productContainer: {
    width: 200,
    marginRight: 12,
  },
});