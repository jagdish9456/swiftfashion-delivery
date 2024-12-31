import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Filter } from 'lucide-react-native';
import { Button } from '../ui/button';

export const CategoryHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Categories</Text>
      <Button onPress={() => {}} variant="ghost" size="icon">
        <Filter size={20} />
      </Button>
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
});