import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/categories/ProductCard";

const products = [
  {
    id: "tc1",
    name: "Designer Dress",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500",
  },
  {
    id: "tc2",
    name: "Formal Suit",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
  },
  {
    id: "tc3",
    name: "Summer Collection",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
  },
  {
    id: "tc4",
    name: "Winter Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
  }
];

export const TopChoices = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Top Choices For You</h2>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <Badge className="absolute top-2 right-2 z-10 bg-red-500">OFFER</Badge>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};