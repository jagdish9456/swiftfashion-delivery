import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProductCard } from './ProductCard';

const mockProducts = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    originalPrice: 129.99,
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27'
  },
  {
    id: '3',
    name: 'Summer Dress',
    price: 59.99,
    originalPrice: 79.99,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8'
  },
];

type SimilarProductsProps = {
  title: string;
};

export const SimilarProducts = ({ title }: SimilarProductsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mockProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
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
    gap: 12,
  },
  productCard: {
    width: 160,
  },
});