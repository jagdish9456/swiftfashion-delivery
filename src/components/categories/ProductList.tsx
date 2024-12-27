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

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  lastProductRef?: (node: HTMLDivElement | null) => void;
}

export const ProductList = ({ products, isLoading, lastProductRef }: ProductListProps) => {
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
            image={product.images[0]?.url || "/placeholder.svg"}
            brand={product.brand}
          />
        </div>
      ))}
    </div>
  );
};