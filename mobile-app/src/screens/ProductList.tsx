import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { CategoryList } from '../components/categories/CategoryList';

export const ProductList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title="Products" />
      <CategoryList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});