import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Heart } from 'lucide-react-native';

const mockWishlistItems = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    price: 49.99,
    originalPrice: 69.99,
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    rating: 4.2,
    reviews: 256
  },
];

export const Wishlist = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={20} color="#ef4444" fill="#ef4444" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
          <Text style={styles.discount}>{item.discount}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{item.rating} ★</Text>
          </View>
          <Text style={styles.reviews}>{item.reviews} Reviews</Text>
        </View>
        <TouchableOpacity style={styles.moveButton}>
          <Text style={styles.moveButtonText}>MOVE TO BAG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={mockWishlistItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 3/4,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 6,
  },
  cardContent: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 14,
    color: '#22c55e',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  rating: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  moveButton: {
    backgroundColor: '#9b87f5',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  moveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});