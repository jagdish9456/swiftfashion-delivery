import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { Package2 } from 'lucide-react-native';

export const Orders = () => {
  const orders = [
    {
      id: '1',
      status: 'Delivered',
      date: 'Dec 20, 2023',
      items: [
        {
          id: '1',
          name: 'Classic White T-Shirt',
          size: 'L',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
        }
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title="My Orders" />
      <ScrollView style={styles.content}>
        {orders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Package2 size={20} color="#9b87f5" />
              <View style={styles.orderInfo}>
                <Text style={styles.orderStatus}>{order.status}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
            </View>
            {order.items.map(item => (
              <View key={item.id} style={styles.orderItem}>
                <View style={styles.itemImage}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSize}>Size: {item.size}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderInfo: {
    marginLeft: 12,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9b87f5',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderItem: {
    flexDirection: 'row',
    marginTop: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemSize: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
});