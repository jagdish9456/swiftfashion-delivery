import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { UserRound } from 'lucide-react-native';
import { FlashList } from '@shopify/flash-list';
import { categories } from '../data/category.json';

export const Categories = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('men');

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => navigation.navigate('ProductList', { categoryId: item.id })}
      testID={`category-${item.id}`}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} testID="categories-screen">
      <Header isMainHeader testID="categories-header" />
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'men' && styles.activeTab]}
          onPress={() => setActiveTab('men')}
          testID="men-tab"
        >
          <UserRound size={20} />
          <Text style={styles.tabText}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'women' && styles.activeTab]}
          onPress={() => setActiveTab('women')}
          testID="women-tab"
        >
          <UserRound size={20} />
          <Text style={styles.tabText}>Women</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={categories}
        renderItem={renderCategory}
        numColumns={3}
        estimatedItemSize={150}
        contentContainerStyle={styles.list}
        testID="categories-list"
      />
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#9b87f5',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  list: {
    padding: 8,
  },
  categoryCard: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    height: 120,
  },
  categoryImage: {
    width: '100%',
    height: 80,
  },
  categoryName: {
    padding: 8,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});