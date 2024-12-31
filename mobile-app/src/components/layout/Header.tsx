import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Bell, UserRound } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationButton } from './LocationButton';
import { SearchBar } from './SearchBar';

type HeaderProps = {
  showBack?: boolean;
  title?: string;
  testID?: string;
  isMainHeader?: boolean;
};

export const Header = ({ 
  showBack = true, 
  title = '', 
  testID = 'header', 
  isMainHeader = false 
}: HeaderProps) => {
  const navigation = useNavigation();
  
  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const renderMainHeader = () => (
    <View style={styles.mainHeader}>
      <View style={styles.topRow}>
        <LocationButton />
        <View style={styles.iconContainer}>
          <TouchableOpacity 
            onPress={handleNotificationPress}
            style={styles.iconButton}
            testID="notification-button"
          >
            <Bell size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleProfilePress}
            style={styles.iconButton}
            testID="profile-button"
          >
            <UserRound size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar />
      </View>
    </View>
  );

  const renderSecondaryHeader = () => (
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
      <View style={styles.iconContainer}>
        <TouchableOpacity 
          onPress={handleNotificationPress}
          style={styles.iconButton}
        >
          <Bell size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleProfilePress}
          style={styles.iconButton}
        >
          <UserRound size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView 
      style={styles.safeArea} 
      testID={testID}
      edges={['top']}
    >
      {isMainHeader ? renderMainHeader() : renderSecondaryHeader()}
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
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? 44 : 56,
    width: '100%',
  },
  mainHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchContainer: {
    marginTop: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
});