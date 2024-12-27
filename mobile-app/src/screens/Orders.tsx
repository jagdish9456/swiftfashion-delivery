import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Header } from '../components/layout/Header';
import { Package2, Search, SlidersHorizontal } from 'lucide-react-native';
import { Input } from '../components/ui/input';

const orderData = [
  {
    id: '1',
    status: 'Exchange Delivered',
    date: 'On Fri, 20 Dec',
    brand: 'Blackberrys',
    name: 'Round Neck Pullover Cotton Sweatshirt',
    size: '3XL',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2',
    returnDate: '27 Dec',
  },
  {
    id: '2',
    status: 'Delivered',
    date: 'On Tue, 17 Dec',
    brand: 'Park Avenue',
    name: 'Men Slim fit Sweatshirt',
    size: 'XXL',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    returnDate: '27 Dec',
  },
];

export const Orders = () => {
  return (
    <View style={styles.container}>
      <Header title="Orders" showBack testID="orders-header" />
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <Input
            placeholder="Search in orders"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color="#000" />
          <Text style={styles.filterText}>FILTER</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {orderData.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.statusContainer}>
              <Package2 size={24} color="#9b87f5" />
              <View>
                <Text style={styles.statusText}>{order.status}</Text>
                <Text style={styles.dateText}>{order.date}</Text>
              </View>
            </View>
            <View style={styles.productContainer}>
              <Image source={{ uri: order.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.brandText}>{order.brand}</Text>
                <Text style={styles.productName}>{order.name}</Text>
                <Text style={styles.sizeText}>Size: {order.size}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.buttonText}>Exchange</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.buttonText}>Return</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.returnText}>
              Exchange/Return available till {order.returnDate}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9b87f5',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  productContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '500',
  },
  productName: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  sizeText: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  returnText: {
    fontSize: 14,
    color: '#666',
  },
});