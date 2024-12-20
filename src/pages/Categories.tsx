import { Filter } from "lucide-react";
import { ProductCard } from "@/components/categories/ProductCard";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

const categories = [
  "All",
  "T-Shirts",
  "Shirts",
  "Pants",
  "Dresses",
  "Skirts",
  "Jackets",
  "Sweaters",
  "Activewear",
  "Accessories",
  "Shoes",
  "Bags",
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
      <div className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-3 flex items-center border-b">
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

      {/* Sidebar */}
      <aside className="w-48 bg-white shadow-md fixed left-0 top-[53px] bottom-0">
        <div className="p-4 overflow-y-auto max-h-full hide-scrollbar">
          <h2 className="font-semibold text-lg mb-4 text-primary-500">Categories</h2>
          <nav className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-primary-50 hover:text-primary-500 transition-colors"
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-48 mt-[53px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1" />
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-primary-50 hover:text-primary-500"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};