import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCart } from '../../contexts/CartContext';

export const CartSummary = () => {
  const { items } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Shipping</Text>
        <Text style={styles.value}>${shipping.toFixed(2)}</Text>
      </View>
      <View style={[styles.row, styles.total]}>
        <Text style={[styles.label, styles.totalLabel]}>Total</Text>
        <Text style={[styles.value, styles.totalValue]}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    margin: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#666',
  },
  value: {
    fontWeight: '500',
  },
  total: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    color: '#000',
    fontWeight: '600',
  },
  totalValue: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
});