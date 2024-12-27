export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice: number;
  categoryId: string;
  subcategoryId: string;
  brand: string;
  sku: string;
  barcode: string;
  images: string[];
  stock: number;
  lowStock: number;
  sold: number;
  rating: number;
  reviews: number;
  isNew: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}