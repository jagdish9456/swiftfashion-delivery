import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const categories = [
  {
    id: '1',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200'
  },
  {
    id: '2',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=200'
  },
  {
    id: '3',
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=200'
  },
  {
    id: '4',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200'
  }
];

export const GridCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => {}}
          >
            <Image
              source={{ uri: category.image }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
});