import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Fashion', image: '/placeholder.svg' },
  { id: '2', name: 'Electronics', image: '/placeholder.svg' },
  { id: '3', name: 'Home', image: '/placeholder.svg' },
  // Add more categories as needed
];

export const CategorySection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.category}
            onPress={() => navigation.navigate('Categories', { id: category.id })}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: category.image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.name}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  category: {
    marginRight: 12,
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});