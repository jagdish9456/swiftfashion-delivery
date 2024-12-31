import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerLoader } from '../common/ShimmerLoader';

export const AIResponseLoader = () => {
  return (
    <View style={styles.container}>
      {Array(3).fill(0).map((_, index) => (
        <ShimmerLoader
          key={index}
          height={60}
          style={styles.shimmer}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  shimmer: {
    marginBottom: 12,
    borderRadius: 8,
  },
});