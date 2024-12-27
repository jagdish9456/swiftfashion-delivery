import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native-web';

export const PromoPopup = () => {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.popupContainer}>
      <Text style={styles.popupText}>This is a promotional popup!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    top: 50,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  popupText: {
    fontSize: 16,
    color: '#333',
  },
});
