import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Package2, Heart, Gift, Headphones, ChevronRight, Settings } from 'lucide-react-native';

export const Profile = () => {
  const menuItems = [
    { icon: Package2, label: 'My Orders', route: 'Orders' },
    { icon: Heart, label: 'My Wishlist', route: 'Wishlist' },
    { icon: Gift, label: 'My Coupons', route: 'Coupons' },
    { icon: Settings, label: 'Settings', route: 'Settings' },
    { icon: Headphones, label: 'Help Center', route: 'HelpCenter' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <View style={styles.userInfo}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
        
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
            >
              <View style={styles.menuItemLeft}>
                <item.icon size={20} color="#000" />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.creditSection}>
          <Text style={styles.sectionTitle}>Credit Options</Text>
          <TouchableOpacity style={styles.creditItem}>
            <View>
              <Text style={styles.creditTitle}>Pre-approved loan up to ₹10,00,000</Text>
              <Text style={styles.creditSubtitle}>Interest rates from 10.99%</Text>
            </View>
            <ChevronRight size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav />
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
  userInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  menu: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontSize: 16,
  },
  creditSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  creditItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  creditTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  creditSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});