import React from 'react';
import { Package } from 'lucide-react';

interface ActiveOrderBarProps {
  className?: string;
}

export const ActiveOrderBar = ({ className }: ActiveOrderBarProps) => {
  return (
    <div className={`bg-primary-50 py-2 px-3 flex items-center justify-between ${className || ''}`}>
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-primary-600" />
        <span className="text-sm text-primary-700">Arriving Today by 7 PM</span>
      </div>
      <button className="text-sm font-medium text-primary-600">Track</button>
    </div>
  );
};