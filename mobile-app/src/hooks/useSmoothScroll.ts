import { useRef, useEffect } from 'react';
import { ScrollView, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { App } from '@capacitor/app';

export const useSmoothScroll = () => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      const handleBackButton = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        App.exitApp();
        return true;
      };

      const backListener = App.addListener('backButton', handleBackButton);

      return () => {
        backListener.then(listener => listener.remove());
      };
    }
  }, [navigation]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };

  return {
    scrollRef,
    scrollY,
    scrollToTop,
  };
};