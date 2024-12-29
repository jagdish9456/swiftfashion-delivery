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

const PLACEHOLDER_IMAGE = "https://png.pngtree.com/png-clipart/20220626/original/pngtree-default-placeholder-businessman-half-length-portr-png-image_8195580.png";

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
            image={isAIResult ? PLACEHOLDER_IMAGE : (product.images[0]?.url || "/placeholder.svg")}
            brand={product.brand}
          />
        </div>
      ))}
    </div>
  );
};