import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';

type HeaderProps = {
  showBack?: boolean;
  title?: string;
  testID?: string;
};

export const Header = ({ showBack, title, testID = 'header' }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <View style={styles.header}>
        {showBack && (
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            testID="header-back-button"
          >
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
        )}
        {title && (
          <Text style={styles.title} testID="header-title">
            {title}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    zIndex: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    height: 60,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});