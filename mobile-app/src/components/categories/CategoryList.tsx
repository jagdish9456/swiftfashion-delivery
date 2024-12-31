import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductCard } from './ProductCard';
import { products } from '../../data/products.json';
import { FlashList } from '@shopify/flash-list';

export const CategoryList = () => {
  return (
    <View style={styles.container}>
      <FlashList
        data={products}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});