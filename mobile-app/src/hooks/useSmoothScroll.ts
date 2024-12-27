import { useRef, useEffect } from 'react';
import { ScrollView, Animated, Platform, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useSmoothScroll = () => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const backAction = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, [navigation]);

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