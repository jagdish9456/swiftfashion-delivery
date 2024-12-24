import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const deals = [
  {
    id: '1',
    title: 'Summer Sale',
    discount: '50% OFF',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500'
  },
  {
    id: '2',
    title: 'New Arrivals',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
  }
];

export const DealsSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Deals</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {deals.map((deal) => (
          <View key={deal.id} style={styles.dealContainer}>
            <Image
              source={{ uri: deal.image }}
              style={styles.dealImage}
            />
            <View style={styles.dealInfo}>
              <Text style={styles.dealTitle}>{deal.title}</Text>
              <Text style={styles.dealDiscount}>{deal.discount}</Text>
            </View>
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
  },
  dealContainer: {
    width: 280,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  dealImage: {
    width: '100%',
    height: 160,
  },
  dealInfo: {
    padding: 12,
    backgroundColor: '#fff',
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  dealDiscount: {
    fontSize: 14,
    color: '#E53935',
    fontWeight: '600',
  },
});