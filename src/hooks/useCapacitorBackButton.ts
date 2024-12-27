import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useNavigate, useLocation } from 'react-router-dom';

export const useCapacitorBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = async () => {
      if (location.pathname === '/') {
        await App.exitApp();
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