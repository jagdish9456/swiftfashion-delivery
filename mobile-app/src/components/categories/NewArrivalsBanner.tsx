import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../ui/button';

type NewArrivalsBannerProps = {
  categoryId?: string;
};

export const NewArrivalsBanner = ({ categoryId }: NewArrivalsBannerProps) => {
  const categoryName = categoryId?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'All Categories';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>New Arrivals</Text>
        <Text style={styles.subtitle}>
          Check out our latest collection in {categoryName}
        </Text>
        <Button 
          variant="secondary"
          style={styles.button}
          onPress={() => {}}
        >
          Explore Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F2FCE2',
  },
  content: {
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#fff',
  },
});