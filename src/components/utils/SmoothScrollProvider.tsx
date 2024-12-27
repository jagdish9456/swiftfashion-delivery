import React, { useEffect } from 'react';

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.scrollTo) {
        target.scrollTo({
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('scroll', smoothScroll, { passive: false });
    return () => document.removeEventListener('scroll', smoothScroll);
  }, []);

  return <>{children}</>;
};