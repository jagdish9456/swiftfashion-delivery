import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollTo) {
        target.scrollTo({
          behavior: 'smooth'
        });
      }
    };

    const enableSmoothScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
    };

    enableSmoothScroll();
    document.addEventListener('scroll', smoothScroll, { passive: true });
    
    return () => {
      document.removeEventListener('scroll', smoothScroll);
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return <>{children}</>;
};