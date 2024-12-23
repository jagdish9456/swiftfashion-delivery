import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const banners = [
  { id: '1', image: '/placeholder.svg' },
  { id: '2', image: '/placeholder.svg' },
  // Add more banners as needed
];

export const OfferBanners = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {banners.map((banner) => (
          <TouchableOpacity key={banner.id} style={styles.banner}>
            <Image
              source={{ uri: banner.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const bannerWidth = width * 0.8;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  banner: {
    width: bannerWidth,
    height: 150,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});