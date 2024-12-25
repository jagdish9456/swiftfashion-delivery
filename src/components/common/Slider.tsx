import React from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native-web';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

type AnimatedValueWithExtras = Animated.Value & {
  _value: number;
  _offset: number;
};

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const pan = React.useRef(new Animated.Value(0) as AnimatedValueWithExtras).current;
  const width = React.useRef(0);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset(pan._value);
      },
      onPanResponderMove: (_, gestureState) => {
        const newWidth = Math.max(0, Math.min(width.current, gestureState.moveX));
        pan.setValue(newWidth - pan._offset);
        
        const percentage = newWidth / width.current;
        const newValue = min + (max - min) * percentage;
        const steppedValue = Math.round(newValue / step) * step;
        onValueChange(Math.min(max, Math.max(min, steppedValue)));
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const getPercentage = () => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        width.current = event.nativeEvent.layout.width;
        pan.setValue((width.current * getPercentage()) / 100);
      }}
    >
      <View style={styles.track} />
      <Animated.View
        style={[
          styles.fill,
          {
            width: pan.interpolate({
              inputRange: [0, width.current || 1],
              outputRange: ['0%', '100%'],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [
              {
                translateX: pan.interpolate({
                  inputRange: [0, width.current || 1],
                  outputRange: [0, width.current || 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  fill: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#9b87f5',
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#9b87f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ translateX: -10 }],
  },
});