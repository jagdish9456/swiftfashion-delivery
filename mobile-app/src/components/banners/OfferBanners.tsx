import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

export const OfferBanners = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.banner}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800' }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>Designer Collection</Text>
            <Text style={styles.subtitle}>Up to 60% OFF</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Shop Now →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  banner: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});