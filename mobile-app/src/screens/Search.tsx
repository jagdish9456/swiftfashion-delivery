import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { SearchBar } from '../components/layout/SearchBar';

export const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <SearchBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});