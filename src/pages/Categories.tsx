import { Filter } from "lucide-react";
import { ProductCard } from "@/components/categories/ProductCard";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

const categories = [
  { name: "All", icon: "🏷️" },
  { name: "T-Shirts", icon: "👕" },
  { name: "Shirts", icon: "👔" },
  { name: "Pants", icon: "👖" },
  { name: "Dresses", icon: "👗" },
  { name: "Skirts", icon: "👘" },
  { name: "Jackets", icon: "🧥" },
  { name: "Sweaters", icon: "🧶" },
  { name: "Activewear", icon: "🎽" },
  { name: "Accessories", icon: "👜" },
  { name: "Shoes", icon: "👞" },
  { name: "Bags", icon: "🎒" },
];

const products = [
  {
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
  },
  {
    name: "Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500",
  },
  {
    name: "Summer Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500",
  },
  {
    name: "Slim Fit Jeans",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
  },
  {
    name: "Floral Blouse",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500",
  },
  {
    name: "Leather Boots",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500",
  },
];

export const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Back button and header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => navigate('/')}
          >
            ←
          </Button>
          <h1 className="text-lg font-semibold">
            {id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-primary-50 hover:text-primary-500"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside className="w-16 bg-white shadow-sm fixed left-0 top-[53px] bottom-0">
        <div className="p-2 overflow-y-auto max-h-full hide-scrollbar">
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.name}
                className="w-full flex flex-col items-center p-2 rounded-lg text-sm hover:bg-primary-50 hover:text-primary-500 transition-colors"
              >
                <span className="text-lg mb-1">{category.icon}</span>
                <span className="text-[10px]">{category.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 ml-16 mt-[53px]">
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};