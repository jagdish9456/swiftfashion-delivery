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
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  paymentMethods: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  methodsText: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#9b87f5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#e5e5e5',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  terms: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});