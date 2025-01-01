import React, { useEffect } from 'react';
import { Shimmer } from '@/components/ui/shimmer';

export const DealsSection = () => {
  useEffect(() => {
    console.log('DealsSection mounted');
    return () => {
      console.log('DealsSection unmounted');
    };
  }, []);

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Shimmer className="h-8 w-3/4" />
        <div className="grid grid-cols-2 gap-4">
          <Shimmer className="h-32 w-full" />
          <Shimmer className="h-32 w-full" />
          <Shimmer className="h-32 w-full" />
          <Shimmer className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
};