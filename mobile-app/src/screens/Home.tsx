import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { CategorySection } from '../components/categories/CategorySection';
import { OfferBanners } from '../components/banners/OfferBanners';
import { DealsSection } from '../components/sections/DealsSection';
import { ClothingCategories } from '../components/categories/ClothingCategories';
import { TopProducts } from '../components/sections/TopProducts';
import { TopChoices } from '../components/sections/TopChoices';
import { StoreSection } from '../components/stores/StoreSection';
import { BottomNav } from '../components/layout/BottomNav';

export const Home = () => {
  return (
    <SafeAreaView style={styles.container} testID="home-screen">
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <OfferBanners />
        <DealsSection />
        <CategorySection />
        <ClothingCategories title="Summer Collection" />
        <TopProducts />
        <ClothingCategories title="Winter Collection" />
        <TopChoices />
        <ClothingCategories title="Ethnic Collection" />
        <StoreSection />
        <ClothingCategories title="Designer Collection" />
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