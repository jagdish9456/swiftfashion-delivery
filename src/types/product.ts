export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  colors: string[];
  type: string[];
  material: string;
  sizes: string[];
  season: string[];
  wearType: string;
  image: string;
  lowStock?: boolean;
  sold?: number;
  reviews?: number;
  isNew?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  images: {
    id: string;
    url: string;
    alt: string;
    isDefault: boolean;
  }[];
}