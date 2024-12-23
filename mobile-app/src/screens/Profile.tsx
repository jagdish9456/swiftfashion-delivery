import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { User, Settings, ShoppingBag, Heart, LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const Profile = () => {
  const navigation = useNavigation();

  const menuItems = [
    { icon: User, label: 'My Details', route: 'ProfileDetails' },
    { icon: ShoppingBag, label: 'My Orders', route: 'Orders' },
    { icon: Heart, label: 'My Wishlist', route: 'Wishlist' },
    { icon: Settings, label: 'Settings', route: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
        
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <item.icon size={20} color="#000" />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 116,
  },
  userInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 20,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuLabel: {
    marginLeft: 12,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 'auto',
  },
  logoutText: {
    marginLeft: 12,
    color: '#ef4444',
    fontSize: 16,
  },
});