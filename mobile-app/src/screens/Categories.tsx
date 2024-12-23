import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { CategoryList } from '../components/categories/CategoryList';
import { CategoryHeader } from '../components/categories/CategoryHeader';
import { FilterSheet } from '../components/filters/FilterSheet';

export const Categories = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <CategoryHeader />
        <CategoryList />
        <FilterSheet />
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