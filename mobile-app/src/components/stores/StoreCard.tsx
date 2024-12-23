import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';

interface StoreCardProps {
  name: string;
  image: string;
  discount: number;
  deliveryTime: string;
  type: string;
}

export const StoreCard = ({
  name,
  image,
  discount,
  deliveryTime,
  type,
}: StoreCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discount}% OFF</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <View style={styles.deliveryInfo}>
          <Clock size={12} color="#666" />
          <Text style={styles.deliveryTime}>{deliveryTime}</Text>
        </View>
        <Text style={styles.type}>{type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#666',
  },
  type: {
    fontSize: 12,
    color: '#666',
  },
});