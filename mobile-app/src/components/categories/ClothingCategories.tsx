import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ProductCard } from '../product/ProductCard';

const formalWear = [
  {
    id: "fw1",
    name: "Classic Black Suit",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
    description: "Elegant black suit for formal occasions",
    brand: "EssentialWear"
  },
  {
    id: "fw2",
    name: "Business Blazer",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
    description: "Professional business blazer for office wear",
    brand: "EssentialWear"
  }
];

const ethnicWear = [
  {
    id: "ew1",
    name: "Silk Saree",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
    description: "Traditional silk saree with intricate designs",
    brand: "EssentialWear"
  },
  {
    id: "ew2",
    name: "Kurta Set",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
    description: "Stylish kurta set for festive occasions",
    brand: "EssentialWear"
  }
];

const CategoryRow = ({ title, products }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
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

export const ClothingCategories = () => {
  return (
    <View style={styles.container}>
      <CategoryRow title="Formal Wear" products={formalWear} />
      <CategoryRow title="Ethnic Wear" products={ethnicWear} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  productContainer: {
    width: 160,
    marginRight: 12,
  },
});