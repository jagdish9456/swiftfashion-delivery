import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

type Suggestion = {
  id: string;
  name: string;
};

type SearchSuggestionsProps = {
  categories: Suggestion[];
  products: Suggestion[];
  onSelect: (type: 'category' | 'product', id: string) => void;
  search: string;
};

export const SearchSuggestions = ({ 
  categories, 
  products, 
  onSelect, 
  search 
}: SearchSuggestionsProps) => {
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProducts = products.filter(prod => 
    prod.name.toLowerCase().includes(search.toLowerCase())
  );

  const hasResults = filteredCategories.length > 0 || filteredProducts.length > 0;

  if (!hasResults) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No results found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {filteredCategories.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {filteredCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.item}
              onPress={() => onSelect('category', category.id)}
            >
              <Text style={styles.itemText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {filteredProducts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
          {filteredProducts.map(product => (
            <TouchableOpacity
              key={product.id}
              style={styles.item}
              onPress={() => onSelect('product', product.id)}
            >
              <Text style={styles.itemText}>{product.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  section: {
    paddingVertical: 8,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    backgroundColor: '#f5f5f5',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  emptyText: {
    padding: 16,
    textAlign: 'center',
    color: '#666',
  },
});