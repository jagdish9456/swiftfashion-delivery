import { ProductCard } from "./ProductCard";

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

const placeholderImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
];

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  lastProductRef?: (node: HTMLDivElement | null) => void;
  isAIResult?: boolean;
}

export const ProductList = ({ products, isLoading, lastProductRef, isAIResult = false }: ProductListProps) => {
  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  const getPlaceholderImage = (index: number) => {
    return placeholderImages[index % placeholderImages.length];
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={index === products.length - 1 ? lastProductRef : undefined}
        >
          <ProductCard
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={isAIResult ? getPlaceholderImage(index) : (product.images[0]?.url || "/placeholder.svg")}
            brand={product.brand}
          />
        </div>
      ))}
    </div>
  );
};