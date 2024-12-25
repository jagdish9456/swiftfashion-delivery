import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/layout/Header';
import { ProductImageCarousel } from '../components/product/ProductImageCarousel';
import { ProductInfo } from '../components/product/ProductInfo';
import { SimilarProducts } from '../components/product/SimilarProducts';

const mockProduct = {
  name: "Premium Cotton T-Shirt",
  price: 29.99,
  originalPrice: 49.99,
  discount: "40% off",
  rating: 4.5,
  ratingCount: 128,
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
  ],
  details: {
    color: "Pink",
    length: "Regular",
    type: "Casual",
    sleeve: "Full Sleeve",
  },
  description: "Slip into this trendy and attractive casual shirt and look stylish effortlessly.",
};

export const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("blue");

  return (
    <View style={styles.container}>
      <Header showBack title="Product Details" />
      <ScrollView style={styles.content}>
        <ProductImageCarousel images={mockProduct.images} name={mockProduct.name} />
        <ProductInfo {...mockProduct} />
        <SimilarProducts title="Similar Products" />
        <SimilarProducts title="Trending Now" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});