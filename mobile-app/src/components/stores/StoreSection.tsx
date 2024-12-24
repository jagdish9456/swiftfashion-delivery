import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StoreCard } from './StoreCard';

const mockStores = [
  { id: '1', name: 'Store 1', distance: '1.2km', rating: 4.5 },
  { id: '2', name: 'Store 2', distance: '2.1km', rating: 4.2 },
  { id: '3', name: 'Store 3', distance: '0.8km', rating: 4.8 },
  { id: '4', name: 'Store 4', distance: '1.5km', rating: 4.6 },
  { id: '5', name: 'Store 5', distance: '3.0km', rating: 4.3 },
];

export const StoreSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Stores Near You</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mockStores.map((store) => (
          <StoreCard
            key={store.id}
            name={store.name}
            distance={store.distance}
            rating={store.rating}
          />
        ))}
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
});