import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { ProductCard } from '../components/product/ProductCard';

const dummyProducts = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    description: 'Comfortable cotton t-shirt',
    brand: 'Essential'
  },
  {
    id: '2',
    name: 'Denim Jeans',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    description: 'Classic blue denim',
    brand: 'Denim Co'
  },
  // Add more dummy products...
];

export const ProductList = ({ route }) => {
  const { categoryId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title="Products" />
      <FlatList
        data={dummyProducts}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <ProductCard {...item} />
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 8,
  },
  productContainer: {
    flex: 1,
    padding: 8,
  },
});