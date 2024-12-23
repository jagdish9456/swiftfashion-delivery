import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { ProductHeader } from '../components/product/ProductHeader';
import { ProductImageCarousel } from '../components/product/ProductImageCarousel';
import { ProductInfo } from '../components/product/ProductInfo';

export const ProductDetails = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <ProductHeader />
        <ProductImageCarousel />
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
    paddingTop: 116,
  },
});