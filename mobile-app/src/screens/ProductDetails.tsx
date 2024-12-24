import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { ProductHeader } from '../components/product/ProductHeader';
import { ProductImageCarousel } from '../components/product/ProductImageCarousel';
import { ProductInfo } from '../components/product/ProductInfo';

const mockProduct = {
  name: "Premium Cotton T-Shirt",
  images: [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
  ]
};

export const ProductDetails = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <ProductHeader />
        <ProductImageCarousel images={mockProduct.images} name={mockProduct.name} />
        <ProductInfo />
      </ScrollView>
      <BottomNav />
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
    paddingTop: 16,
  },
});