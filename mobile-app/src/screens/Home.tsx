import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { CategorySection } from '../components/categories/CategorySection';
import { GridCategories } from '../components/categories/GridCategories';
import { OfferBanners } from '../components/banners/OfferBanners';
import { TopChoices } from '../components/sections/TopChoices';
import { ClothingCategories } from '../components/categories/ClothingCategories';
import { DealsSection } from '../components/sections/DealsSection';
import { TopProducts } from '../components/sections/TopProducts';
import { BottomNav } from '../components/layout/BottomNav';

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <DealsSection />
        <GridCategories />
        <CategorySection />
        <OfferBanners />
        <TopProducts />
        <ClothingCategories />
        <TopChoices />
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
  scrollView: {
    flex: 1,
  },
});