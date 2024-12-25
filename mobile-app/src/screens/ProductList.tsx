import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { ProductCard } from '../components/product/ProductCard';
import { SlidersHorizontal } from 'lucide-react-native';
import { FilterSheet } from '../components/filters/FilterSheet';

const categories = [
  "All", "T-Shirts", "Shirts", "Pants", "Dresses", "Skirts", 
  "Jackets", "Sweaters", "Activewear", "Accessories"
];

const mockProducts = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
  },
  // ... Add more mock products
];

export const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showBack 
        title="Products" 
        rightComponent={
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilter(true)}
          >
            <SlidersHorizontal size={20} color="#000" />
          </TouchableOpacity>
        }
      />
      <View style={styles.content}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <ScrollView 
          style={styles.productList}
          contentContainerStyle={styles.productGrid}
        >
          {mockProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <ProductCard {...product} />
            </View>
          ))}
        </ScrollView>
      </View>
      
      <FilterSheet 
        isVisible={showFilter} 
        onClose={() => setShowFilter(false)} 
      />
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
  filterButton: {
    padding: 8,
  },
  categoryList: {
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#9b87f5',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  productList: {
    flex: 1,
  },
  productGrid: {
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productCard: {
    width: '50%',
    padding: 8,
  },
});