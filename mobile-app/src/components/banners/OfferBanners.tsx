import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const banners = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
  }
];

export const OfferBanners = () => {
  return (
    <View style={styles.container}>
      {banners.map((banner) => (
        <View key={banner.id} style={styles.bannerContainer}>
          <Image
            source={{ uri: banner.image }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>
      ))}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  bannerContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerImage: {
    width: width - 32,
    height: 160,
  },
});