import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Header } from '../components/layout/Header';

const notifications = [
  {
    id: 1,
    title: '82 SuperCoins credited in last 15 days!',
    message: 'You have 444 supercoins. Use them to Shop, Play & Win',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f',
    isNew: true,
    date: '5 days ago'
  },
  {
    id: 2,
    title: 'New Collection Arrived!',
    message: 'Check out our latest summer collection with exciting offers',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    isNew: true,
    date: '1 day ago'
  },
  {
    id: 3,
    title: 'Weekend Sale is Live',
    message: 'Get up to 50% off on premium brands',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a',
    isNew: false,
    date: '1 week ago'
  }
];

export const Notifications = () => {
  return (
    <View style={styles.container}>
      <Header title="Notifications" showBack testID="notifications-header" />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.activeFilterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Order Info</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            {notification.isNew && (
              <Text style={styles.newBadge}>
                New · {notification.date}
              </Text>
            )}
            <View style={styles.notificationContent}>
              <Image 
                source={{ uri: notification.image }} 
                style={styles.notificationImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.message}>{notification.message}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#9b87f5',
    borderColor: '#9b87f5',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    fontSize: 14,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  newBadge: {
    fontSize: 14,
    color: '#f00',
    fontWeight: '500',
    marginBottom: 8,
  },
  notificationContent: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
});