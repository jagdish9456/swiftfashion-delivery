import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ProductCard } from '../product/ProductCard';

const products = [
  {
    id: '1',
    name: 'Product 1',
    price: 99.99,
    image: '/placeholder.svg',
    description: 'Description 1',
    brand: 'Brand 1',
  },
  // Add more products as needed
];

export const TopProducts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Products</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
  productContainer: {
    width: 200,
    marginRight: 12,
  },
});