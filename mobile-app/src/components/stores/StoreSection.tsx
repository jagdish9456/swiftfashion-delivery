import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { StoreCard } from './StoreCard';
import { useNavigation } from '@react-navigation/native';

const allStores = [
  {
    id: "1",
    name: "Ethnic Elegance",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
    discount: 60,
    deliveryTime: "33 mins",
    type: "Ethnic Wear"
  },
  {
    id: "2",
    name: "Modern Fashion Hub",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800",
    discount: 40,
    deliveryTime: "32 mins",
    type: "Modern Fashion"
  },
  {
    id: "3",
    name: "Saree Paradise",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
    discount: 20,
    deliveryTime: "30 mins",
    type: "Saree Shop"
  },
  {
    id: "4",
    name: "Kids Fashion World",
    image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=800",
    discount: 25,
    deliveryTime: "23 mins",
    type: "Kids Wear"
  },
  {
    id: "5",
    name: "Men's Fashion Studio",
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800",
    discount: 30,
    deliveryTime: "25 mins",
    type: "Men's Fashion"
  },
  {
    id: "6",
    name: "Women's Boutique",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
    discount: 15,
    deliveryTime: "35 mins",
    type: "Women's Fashion"
  },
  {
    id: "7",
    name: "Designer Wear",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
    discount: 45,
    deliveryTime: "28 mins",
    type: "Designer Boutique"
  },
  {
    id: "8",
    name: "Traditional Attire",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800",
    discount: 35,
    deliveryTime: "27 mins",
    type: "Traditional Wear"
  }
];

export const StoreSection = () => {
  const navigation = useNavigation();
  const [visibleStores, setVisibleStores] = useState(allStores.slice(0, 8));

  const handleStorePress = () => {
    navigation.navigate('Categories', { category: 'formal-wear' });
  };

  const handleEndReached = () => {
    if (visibleStores.length < allStores.length) {
      setTimeout(() => {
        setVisibleStores(allStores.slice(0, visibleStores.length + 8));
      }, 1000);
    }
  };

  const renderItem = ({ item }: { item: typeof allStores[0] }) => (
    <View style={styles.storeItem}>
      <StoreCard {...item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleStores}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  storeItem: {
    width: '48%',
    marginBottom: 16,
  },
});
