import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: Array<{
    url: string;
    alt: string;
    isDefault: boolean;
  }>;
  brand: string;
}

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductList = ({ products, isLoading }: ProductListProps) => {
  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.images?.[0]?.url || "/placeholder.svg"}
          brand={product.brand}
        />
      ))}
    </div>
  );
};