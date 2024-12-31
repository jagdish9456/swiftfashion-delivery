import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = ({ checked = false, onCheckedChange }: CheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onCheckedChange?.(!checked)}
      activeOpacity={0.7}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderWidth: 2,
          borderColor: checked ? '#000' : '#ccc',
          backgroundColor: checked ? '#000' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
        }}
      >
        {checked && <Check size={14} color="#fff" />}
      </View>
    </TouchableOpacity>
  );
};