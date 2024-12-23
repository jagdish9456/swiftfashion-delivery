import { FC } from 'react';
import { ProductCard } from '../categories/ProductCard';

interface CategoryListProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    icon: string;
    gender: string;
    featured: boolean;
    order: number;
    metaTitle: string;
    metaDescription: string;
  };
}

export const CategoryList: FC<CategoryListProps> = ({ category }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Add product cards here */}
    </div>
  );
};