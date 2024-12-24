import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { CategorySection } from '../components/categories/CategorySection';
import { OfferBanners } from '../components/banners/OfferBanners';
import { ClothingCategories } from '../components/categories/ClothingCategories';
import { BottomNav } from '../components/layout/BottomNav';

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <OfferBanners />
        <CategorySection />
        <ClothingCategories />
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
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