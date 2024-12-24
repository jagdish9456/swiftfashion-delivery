import React from 'react';
import { View, StyleSheet } from 'react-native';
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
import { FlashList } from '@shopify/flash-list';

const sections = [
  { key: 'deals', component: DealsSection },
  { key: 'grid', component: GridCategories },
  { key: 'category', component: CategorySection },
  { key: 'offers', component: OfferBanners },
  { key: 'topProducts', component: TopProducts },
  { key: 'clothing', component: ClothingCategories },
  { key: 'topChoices', component: TopChoices },
];

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <FlashList
          data={sections}
          renderItem={({ item }) => {
            const Component = item.component;
            return <Component />;
          }}
          estimatedItemSize={300}
        />
      </View>
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