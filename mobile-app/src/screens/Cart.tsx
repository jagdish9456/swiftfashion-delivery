import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { CartItem } from '../components/cart/CartItem';
import { CartFooter } from '../components/cart/CartFooter';
import { CartSummary } from '../components/cart/CartSummary';
import { Header } from '../components/layout/Header';

const dummyCartItems = [
  {
    id: '1',
    name: 'Summer T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    quantity: 1,
    size: 'M',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500'
  },
  {
    id: '2',
    name: 'Denim Jeans',
    price: 59.99,
    originalPrice: 79.99,
    quantity: 1,
    size: '32',
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'
  }
];

export const Cart = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Shopping Cart ({dummyCartItems.length})</Text>
        {dummyCartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
        <CartSummary items={dummyCartItems} />
      </ScrollView>
      <CartFooter items={dummyCartItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});