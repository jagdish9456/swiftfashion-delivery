import { useRef } from 'react';
import { ScrollView, Animated } from 'react-native';

export const useSmoothScroll = () => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return {
    scrollRef,
    scrollY,
    scrollToTop,
  };
};