import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Share2, Heart } from 'lucide-react-native';
import { Button } from '../ui/button';

export const ProductHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <View style={styles.actions}>
        <Button onPress={() => {}} variant="ghost" size="icon">
          <Share2 size={20} />
        </Button>
        <Button onPress={() => {}} variant="ghost" size="icon">
          <Heart size={20} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
});