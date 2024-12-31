import React from 'react';
import { Animated, ViewProps } from 'react-native';

interface SlideViewProps extends ViewProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
}

export const SlideView: React.FC<SlideViewProps> = ({
  children,
  direction = 'right',
  duration = 300,
  delay = 0,
  style,
  ...props
}) => {
  const translation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(translation, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  const getTransform = () => {
    const distance = 50;
    switch (direction) {
      case 'left':
        return [{ translateX: translation.interpolate({
          inputRange: [0, 1],
          outputRange: [-distance, 0],
        })}];
      case 'right':
        return [{ translateX: translation.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        })}];
      case 'up':
        return [{ translateY: translation.interpolate({
          inputRange: [0, 1],
          outputRange: [-distance, 0],
        })}];
      case 'down':
        return [{ translateY: translation.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        })}];
    }
  };

  return (
    <Animated.View
      style={[
        {
          transform: getTransform(),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};