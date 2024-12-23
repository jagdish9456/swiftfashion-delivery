import React from 'react';
import { Animated, ViewProps } from 'react-native';

interface FadeViewProps extends ViewProps {
  duration?: number;
  delay?: number;
}

export const FadeView: React.FC<FadeViewProps> = ({ 
  children, 
  duration = 300, 
  delay = 0,
  style,
  ...props 
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};