import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const LocationButton = () => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('SetLocation')}
    >
      <MapPin size={14} color="#9b87f5" />
      <View>
        <Text style={styles.address}>Set Location</Text>
        <Text style={styles.area}>Choose delivery area</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  address: {
    fontSize: 12,
    fontWeight: '500',
  },
  area: {
    fontSize: 10,
    color: '#666',
  },
});