import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StoreCard } from './StoreCard';

const mockStores = [
  { id: '1', name: 'Store 1', distance: '1.2km', rating: 4.5 },
  { id: '2', name: 'Store 2', distance: '2.1km', rating: 4.2 },
  { id: '3', name: 'Store 3', distance: '0.8km', rating: 4.8 },
];

export const StoreSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Stores Near You</Text>
      <FlatList
        data={mockStores}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StoreCard
            name={item.name}
            distance={item.distance}
            rating={item.rating}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});