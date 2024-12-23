import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ProductCard } from './ProductCard';
import { products } from '../../data/products.json';

export const CategoryList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});