import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../ui/button';

export const CartFooter = () => {
  return (
    <View style={styles.container}>
      <Button onPress={() => {}} style={styles.button}>
        Proceed to Checkout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    width: '100%',
  },
});