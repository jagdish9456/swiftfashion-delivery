import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { useCart } from '../contexts/CartContext';

export const Cart = () => {
  const { items } = useCart();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        <CartSummary />
      </ScrollView>
      <BottomNav />
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
    paddingTop: 116,
  },
});