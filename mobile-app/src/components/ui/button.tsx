import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const Button = ({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  style,
  textStyle,
}: ButtonProps) => {
  const buttonStyles = [
    styles.base,
    variant === 'outline' && styles.outline,
    variant === 'ghost' && styles.ghost,
    size === 'sm' && styles.sm,
    size === 'lg' && styles.lg,
    size === 'icon' && styles.icon,
    style,
  ];

  const textStyles = [
    styles.text,
    variant === 'outline' && styles.outlineText,
    variant === 'ghost' && styles.ghostText,
    size === 'sm' && styles.smText,
    size === 'lg' && styles.lgText,
    textStyle,
  ];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      {typeof children === 'string' ? (
        <Text style={textStyles}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#9b87f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9b87f5',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  outlineText: {
    color: '#9b87f5',
  },
  ghostText: {
    color: '#9b87f5',
  },
  smText: {
    fontSize: 14,
  },
  lgText: {
    fontSize: 18,
  },
});