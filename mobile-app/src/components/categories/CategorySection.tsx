import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import categoryData from '../../data/category.json';

const NUM_COLUMNS = 4;
const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / NUM_COLUMNS;

export const CategorySection = () => {
  const categories = categoryData.categories.slice(0, 12);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.categoryName} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} testID="category-section">
      <Text style={styles.title}>Shop by Category</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  gridContainer: {
    gap: 8,
  },
  categoryItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    width: ITEM_WIDTH - 8,
    height: ITEM_WIDTH - 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    marginBottom: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
});