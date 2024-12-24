import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Fashion', image: '/placeholder.svg', gender: 'all' },
  { id: '2', name: 'Electronics', image: '/placeholder.svg', gender: 'all' },
  { id: '3', name: 'Home', image: '/placeholder.svg', gender: 'all' },
  { id: '4', name: "Men's Wear", image: '/placeholder.svg', gender: 'male' },
  { id: '5', name: "Women's Wear", image: '/placeholder.svg', gender: 'female' },
];

export const GridCategories = ({ gender = 'all' }: { gender?: 'all' | 'men' | 'women' }) => {
  const navigation = useNavigation();
  
  const filteredCategories = categories.filter((category) => {
    if (gender === 'all') return true;
    if (gender === 'men') return category.gender === 'male' || category.gender === 'all';
    if (gender === 'women') return category.gender === 'female' || category.gender === 'all';
    return true;
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.grid}>
          {filteredCategories.map((category) => (
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
              <Text style={styles.name} numberOfLines={2}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  category: {
    width: 80,
    alignItems: 'center',
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    color: '#374151',
  },
});