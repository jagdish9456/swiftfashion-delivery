import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { ProductCard } from '../components/product/ProductCard';
import { SlidersHorizontal } from 'lucide-react-native';
import { FilterSheet } from '../components/filters/FilterSheet';
import { NewArrivalsBanner } from '../components/categories/NewArrivalsBanner';

const categories = [
  { id: 'all', name: 'All', emoji: '📱' },
  { id: 't-shirts', name: 'T-Shirts', emoji: '👕' },
  { id: 'shirts', name: 'Shirts', emoji: '👔' },
  { id: 'pants', name: 'Pants', emoji: '👖' },
  { id: 'dresses', name: 'Dresses', emoji: '👗' },
  { id: 'skirts', name: 'Skirts', emoji: '👗' },
  { id: 'jackets', name: 'Jackets', emoji: '🧥' },
  { id: 'sweaters', name: 'Sweaters', emoji: '🧶' },
  { id: 'activewear', name: 'Activewear', emoji: '🏃' },
  { id: 'accessories', name: 'Accessories', emoji: '👜' },
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
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    originalPrice: 129.99,
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27'
  },
  {
    id: '3',
    name: 'Summer Dress',
    price: 59.99,
    originalPrice: 79.99,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8'
  },
  {
    id: '4',
    name: 'Slim Fit Jeans',
    price: 69.99,
    originalPrice: 89.99,
    discount: '22% OFF',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d'
  },
];

export const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
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
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.mainContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <NewArrivalsBanner categoryId={selectedCategory} />
            <View style={styles.productGrid}>
              {mockProducts.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <ProductCard {...product} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      
      <FilterSheet 
        visible={showFilter} 
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
    flexDirection: 'row',
  },
  sidebar: {
    width: 80,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  mainContent: {
    flex: 1,
  },
  filterButton: {
    padding: 8,
  },
  categoryButton: {
    padding: 12,
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
  },
  selectedCategory: {
    borderLeftColor: '#22c55e',
    backgroundColor: '#f0fdf4',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#22c55e',
    fontWeight: '500',
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