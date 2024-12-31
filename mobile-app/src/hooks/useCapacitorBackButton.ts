import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useNavigate, useLocation } from 'react-router-dom';

export const useCapacitorBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let lastBackPress = 0;

  useEffect(() => {
    const handleBackButton = async () => {
      const now = Date.now();
      
      // Prevent multiple rapid back button presses
      if (now - lastBackPress < 500) {
        return;
      }
      lastBackPress = now;

      if (location.pathname === '/') {
        // Show exit confirmation on home screen
        const shouldExit = window.confirm('Do you want to exit the app?');
        if (shouldExit) {
          await App.exitApp();
        }
      } else {
        navigate(-1);
      }
    };

    const backButtonListener = App.addListener('backButton', handleBackButton);

    return () => {
      backButtonListener.then(listener => listener.remove());
    };
  }, [navigate, location]);
};