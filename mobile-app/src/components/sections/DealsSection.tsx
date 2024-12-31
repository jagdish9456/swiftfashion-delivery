import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

const deals = [
  {
    id: 1,
    title: "Deals of the Day",
    subtitle: "60% OFF",
    bgColor: "#FF7043",
  },
  {
    id: 2,
    title: "Unlimited Flat Deal",
    subtitle: "Big orders",
    bgColor: "#FFB74D",
  },
  {
    id: 3,
    title: "Fastest Deliveries",
    subtitle: "See offers",
    bgColor: "#4CAF50",
  },
];

export const DealsSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {deals.map((deal) => (
          <TouchableOpacity
            key={deal.id}
            style={[styles.card, { backgroundColor: deal.bgColor }]}
          >
            <Text style={styles.title}>{deal.title}</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>{deal.subtitle}</Text>
              <ArrowRight size={16} color="white" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
  },
});