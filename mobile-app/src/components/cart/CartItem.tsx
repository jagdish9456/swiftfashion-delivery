import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useCart } from '../../contexts/CartContext';

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export const CartItem = ({ id, name, price, image, quantity }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCart();

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => updateQuantity(id, quantity - 1)}
            style={styles.button}
          >
            <Minus size={16} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(id, quantity + 1)}
            style={styles.button}
          >
            <Plus size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeItem(id)}
            style={[styles.button, styles.removeButton]}
          >
            <Trash2 size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    marginRight: 8,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 'auto',
  },
});