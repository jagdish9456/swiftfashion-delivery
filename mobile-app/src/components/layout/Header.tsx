import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HeaderProps = {
  showBack?: boolean;
  title?: string;
  testID?: string;
};

export const Header = ({ showBack, title, testID = 'header' }: HeaderProps) => {
  const navigation = useNavigation();
  console.log('Rendering Header with title:', title); // Debug log

  return (
    <SafeAreaView 
      style={styles.safeArea} 
      testID={testID}
      edges={['top']}
    >
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
    height: Platform.OS === 'ios' ? 44 : 56,
    width: '100%',
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