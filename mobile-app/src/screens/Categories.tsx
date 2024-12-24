import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { CategoryList } from '../components/categories/CategoryList';
import { FilterSheet } from '../components/filters/FilterSheet';

export const Categories = () => {
  const [activeTab, setActiveTab] = useState('men');

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'men' && styles.activeTab]}
          onPress={() => setActiveTab('men')}
        >
          <Text style={[styles.tabText, activeTab === 'men' && styles.activeTabText]}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'women' && styles.activeTab]}
          onPress={() => setActiveTab('women')}
        >
          <Text style={[styles.tabText, activeTab === 'women' && styles.activeTabText]}>Women</Text>
        </TouchableOpacity>
      </View>
      <CategoryList gender={activeTab} />
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
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#10B981',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#10B981',
    fontWeight: '600',
  },
});