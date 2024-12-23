import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProductInfoProps = {
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  ratingCount: number;
};

export const ProductInfo = ({
  name,
  price,
  originalPrice,
  discount,
  rating,
  ratingCount,
}: ProductInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{rating} ★</Text>
          </View>
          <Text style={styles.ratingCount}>
            {ratingCount}
          </Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.originalPrice}>${originalPrice}</Text>
        <Text style={styles.discount}>{discount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingBadge: {
    backgroundColor: '#9b87f5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 14,
    color: '#9b87f5',
  },
});