import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Checkbox } from '../ui/checkbox';

type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

const sizes: FilterOption[] = [
  { id: "s", label: "S", count: 33 },
  { id: "m", label: "M", count: 29 },
  { id: "l", label: "L", count: 28 },
  { id: "xl", label: "XL", count: 31 },
  { id: "xxl", label: "XXL", count: 30 },
];

export const FilterSheet = () => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

  const handleFilterChange = (id: string) => {
    setSelectedFilters(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          {sizes.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.filterOption}
              onPress={() => handleFilterChange(option.id)}
            >
              <View style={styles.optionRow}>
                <Checkbox
                  checked={selectedFilters.includes(option.id)}
                  onCheckedChange={() => handleFilterChange(option.id)}
                />
                <Text style={styles.optionLabel}>{option.label}</Text>
              </View>
              {option.count && (
                <Text style={styles.count}>{option.count}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionLabel: {
    fontSize: 14,
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
});