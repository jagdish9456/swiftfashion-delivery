import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/layout/Header';
import { ProfileButtons } from '../components/profile/ProfileButtons';
import { ChevronRight, Bell } from 'lucide-react-native';

export const Profile = () => {
  return (
    <View style={styles.container} testID="profile-screen">
      <Header title="Profile" showBack={false} />
      <ScrollView style={styles.content}>
        <View style={styles.userInfo}>
          <View style={styles.userHeader}>
            <Text style={styles.name}>jagdish sharma</Text>
            <ChevronRight size={20} color="#666" />
          </View>
        </View>
        <ProfileButtons />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credit Options</Text>
          <View style={styles.creditOptions}>
            <View style={styles.creditOption}>
              <View>
                <Text style={styles.optionTitle}>Pre-approved loan up to Rs.10,00,000</Text>
                <Text style={styles.optionSubtitle}>Interest rates from 10.99%</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </View>
            
            <View style={styles.creditOption}>
              <View>
                <Text style={styles.optionTitle}>Quickky Credit Card</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </View>
            
            <View style={styles.creditOption}>
              <View>
                <Text style={styles.optionTitle}>Quickky EMI</Text>
                <Text style={styles.optionSubtitle}>Complete your application to avail now</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.notificationSetting}>
            <View style={styles.notificationLeft}>
              <Bell size={20} color="#22c55e" />
              <View>
                <Text style={styles.optionTitle}>Notification Settings</Text>
                <Text style={styles.optionSubtitle}>Manage your notification preferences</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#666" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  userInfo: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  creditOptions: {
    gap: 12,
  },
  creditOption: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationSetting: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});