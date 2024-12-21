import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type ProductListProps = {
  products: Product[];
  isLoading: boolean;
  lastProductRef?: (node: HTMLDivElement | null) => void;
};

const ProductSkeleton = () => (
  <div className="rounded-lg overflow-hidden bg-white shadow-sm">
    <Skeleton className="aspect-square w-full" />
    <div className="p-2 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-7 w-16" />
      </div>
    </div>
  </div>
);

export const ProductList = ({ products, isLoading, lastProductRef }: ProductListProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((product, index) => (
        <div
          ref={index === products.length - 1 ? lastProductRef : null}
          key={product.id}
        >
          <ProductCard {...product} />
        </div>
      ))}
      {isLoading &&
        [1, 2, 3, 4].map((n) => <ProductSkeleton key={n} />)}
    </div>
  );
};