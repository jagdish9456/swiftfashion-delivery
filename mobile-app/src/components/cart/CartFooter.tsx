import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../../contexts/CartContext';

export const CartFooter = () => {
  const { items } = useCart();
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.paymentMethods}>
        <Text style={styles.methodsText}>Accepted Payment Methods</Text>
      </View>
      <TouchableOpacity 
        style={[styles.button, items.length === 0 && styles.buttonDisabled]}
        disabled={items.length === 0}
      >
        <Text style={styles.buttonText}>
          {items.length === 0 
            ? "No items selected" 
            : `PLACE ORDER • $${totalAmount.toFixed(2)}`}
        </Text>
      </TouchableOpacity>
      <Text style={styles.terms}>
        By placing the order, you agree to our Terms and Privacy Policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  paymentMethods: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  methodsText: {
    fontSize: 11,
    color: '#666',
  },
  button: {
    backgroundColor: '#9b87f5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#e5e5e5',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  terms: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },
});