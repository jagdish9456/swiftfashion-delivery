import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';

const dummyOrders = [
  {
    id: '1',
    orderNumber: 'ORD001',
    date: '2024-03-15',
    status: 'Delivered',
    total: 89.99,
    items: [
      {
        id: 'item1',
        name: 'White T-Shirt',
        quantity: 2,
        price: 29.99
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD002',
    date: '2024-03-10',
    status: 'Processing',
    total: 159.99,
    items: [
      {
        id: 'item2',
        name: 'Denim Jeans',
        quantity: 1,
        price: 59.99
      }
    ]
  }
];

export const Orders = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title="My Orders" />
      <FlatList
        data={dummyOrders}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>Order #{item.orderNumber}</Text>
              <Text style={styles.orderStatus}>{item.status}</Text>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.orderDate}>Ordered on {item.date}</Text>
              <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderNumber: {
    fontWeight: '600',
    fontSize: 16,
  },
  orderStatus: {
    color: '#22c55e',
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDate: {
    color: '#666',
  },
  orderTotal: {
    fontWeight: '600',
  },
});