import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StoreCard } from './StoreCard';

const mockStores = [
  {
    name: "Fashion Store",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    discount: 40,
    deliveryTime: "30-40 mins",
    type: "Clothing & Accessories"
  },
  {
    name: "Trendy Boutique",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5",
    discount: 30,
    deliveryTime: "25-35 mins",
    type: "Fashion & Style"
  },
  {
    name: "Urban Wear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    discount: 25,
    deliveryTime: "35-45 mins",
    type: "Street Fashion"
  },
  {
    name: "Elite Fashion",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
    discount: 35,
    deliveryTime: "20-30 mins",
    type: "Luxury Wear"
  }
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
        {mockStores.map((store, index) => (
          <View key={index} style={styles.cardContainer}>
            <StoreCard {...store} />
          </View>
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
  cardContainer: {
    width: 200,
  }
});