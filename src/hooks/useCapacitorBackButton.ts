import { useEffect, useRef, useCallback } from 'react';
import { App } from '@capacitor/app';
import { useNavigate, useLocation } from 'react-router-dom';

export const useCapacitorBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastBackPress = useRef(0);
  const backPressThreshold = 300; // Minimum time between back presses in ms

  const handleBackButton = useCallback(async () => {
    const now = Date.now();
    
    // Prevent multiple rapid back button presses
    if (now - lastBackPress.current < backPressThreshold) {
      return;
    }
    
    lastBackPress.current = now;

    if (location.pathname === '/') {
      // Show exit confirmation on home page
      const shouldExit = window.confirm('Do you want to exit the app?');
      if (shouldExit) {
        await App.exitApp();
      }
    } else {
      navigate(-1);
    }
  }, [navigate, location]);

  useEffect(() => {
    let listener: any;

    const setupListener = async () => {
      listener = await App.addListener('backButton', handleBackButton);
    };

    setupListener();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [handleBackButton]);
};
