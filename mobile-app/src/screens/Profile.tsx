import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { Package2, Heart, Gift, Headphones, ChevronRight, Bell } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const Profile = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" showBack />
      <ScrollView style={styles.content}>
        <TouchableOpacity 
          style={styles.userSection}
          onPress={() => navigation.navigate('ProfileDetails')}
        >
          <View>
            <Text style={styles.userName}>jagdish sharma</Text>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>

        <View style={styles.gridContainer}>
          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('Orders')}
          >
            <Package2 size={24} color="#9b87f5" />
            <Text style={styles.gridText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('Wishlist')}
          >
            <Heart size={24} color="#9b87f5" />
            <Text style={styles.gridText}>Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem}>
            <Gift size={24} color="#9b87f5" />
            <Text style={styles.gridText}>Coupons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem}>
            <Headphones size={24} color="#9b87f5" />
            <Text style={styles.gridText}>Help Center</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credit Options</Text>
          <View style={styles.creditOptions}>
            <TouchableOpacity style={styles.creditOption}>
              <View>
                <Text style={styles.creditTitle}>Pre-approved loan up to Rs.10,00,000</Text>
                <Text style={styles.creditSubtitle}>Interest rates from 10.99%</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.creditOption}>
              <Text style={styles.creditTitle}>Quickky Credit Card</Text>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.creditOption}>
              <View>
                <Text style={styles.creditTitle}>Quickky EMI</Text>
                <Text style={styles.creditSubtitle}>Complete your application to avail now</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.notificationSettings}>
          <View style={styles.notificationContent}>
            <Bell size={20} color="#9b87f5" />
            <View>
              <Text style={styles.notificationTitle}>Notification Settings</Text>
              <Text style={styles.notificationSubtitle}>Manage your notification preferences</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#666" />
        </TouchableOpacity>
      </ScrollView>
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
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  gridItem: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  gridText: {
    marginTop: 8,
    fontSize: 14,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  creditOptions: {
    gap: 12,
  },
  creditOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  creditTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  creditSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  notificationSettings: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  notificationSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});