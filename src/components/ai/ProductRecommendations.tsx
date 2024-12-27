import { ProductList } from "@/components/categories/ProductList";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    isDefault: boolean;
  }>;
}

interface ProductRecommendationsProps {
  products: Product[];
  isLoading: boolean;
}

export const ProductRecommendations = ({ products, isLoading }: ProductRecommendationsProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-6">
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};