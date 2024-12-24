import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { CategoryList } from '../components/categories/CategoryList';

export const Categories = () => {
  const [activeTab, setActiveTab] = useState('men');

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <CategoryList gender={activeTab} onTabChange={setActiveTab} />
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