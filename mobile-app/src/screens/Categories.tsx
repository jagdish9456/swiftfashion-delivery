import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { CategoryList } from '../components/categories/CategoryList';
import { CategoryHeader } from '../components/categories/CategoryHeader';
import { FilterSheet } from '../components/filters/FilterSheet';

export const Categories = () => {
  return (
    <View style={styles.container}>
      <Header />
      <CategoryHeader />
      <CategoryList />
      <FilterSheet />
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});