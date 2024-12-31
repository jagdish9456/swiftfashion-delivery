import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
};

type SimilarProductsProps = {
  products: Product[];
};

export const SimilarProducts = ({ products }: SimilarProductsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {products.map((product) => (
        <TouchableOpacity key={product.id} style={styles.card}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price}</Text>
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
              <Text style={styles.discount}>{product.discount}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 12,
  },
  card: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 14,
    color: '#10B981',
  },
});