import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { UserRound } from 'lucide-react-native';
import { FlashList } from '@shopify/flash-list';

const categories = [
  {
    id: '1',
    name: 'Suits & Blazer',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500',
  },
  {
    id: '2',
    name: 'Formal Shirts',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500',
  },
  {
    id: '3',
    name: 'Casual Shirts',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500',
  },
  {
    id: '4',
    name: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500',
  },
  {
    id: '5',
    name: 'Jeans',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500',
  },
  {
    id: '6',
    name: 'Trousers',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500',
  },
];

export const Categories = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('men');

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => navigation.navigate('ProductList', { categoryId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Categories" />
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'men' && styles.activeTab]}
          onPress={() => setActiveTab('men')}
        >
          <UserRound size={20} />
          <Text style={styles.tabText}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'women' && styles.activeTab]}
          onPress={() => setActiveTab('women')}
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
  },
  categoryImage: {
    width: '100%',
    aspectRatio: 1,
  },
  categoryName: {
    padding: 8,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});