import { Filter } from "lucide-react";
import { ProductCard } from "@/components/categories/ProductCard";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { FooterText } from "@/components/layout/FooterText";

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
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500",
  },
  {
    id: "3",
    name: "Summer Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500",
  },
  {
    id: "4",
    name: "Slim Fit Jeans",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
  },
  {
    id: "5",
    name: "Floral Blouse",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500",
  },
  {
    id: "6",
    name: "Leather Boots",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500",
  },
  {
    id: "7",
    name: "Elegant Blazer",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
  },
  {
    id: "8",
    name: "Formal Trousers",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
  },
  {
    id: "9",
    name: "Business Shirt",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500",
  },
  {
    id: "10",
    name: "Silk Tie",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=500",
  },
  {
    id: "11",
    name: "Wool Suit",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
  },
  {
    id: "12",
    name: "Dress Shoes",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500",
  },
];

export const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Split products array for displaying special offer in the middle
  const firstHalfProducts = products.slice(0, 6);
  const secondHalfProducts = products.slice(6);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 flex items-center justify-between border-b">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => navigate('/')}
          >
            ←
          </Button>
          <h1 className="text-base font-semibold">
            {id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 hover:bg-primary-50 hover:text-primary-500"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside className="w-16 bg-white shadow-sm fixed left-0 top-[41px] bottom-0">
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
      <div className="flex-1 ml-16 mt-[41px]">
        {/* New Arrivals Banner */}
        <div className="p-2 bg-[#F2FCE2]">
          <div className="rounded-lg p-3">
            <h3 className="text-base font-semibold text-primary-800 mb-1">New Arrivals</h3>
            <p className="text-sm text-primary-600 mb-2">
              Check out our latest collection in {id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </p>
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto bg-white hover:bg-primary-50"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Explore Now
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <main className="p-4">
          {/* First half of products */}
          <div className="grid grid-cols-2 gap-3">
            {firstHalfProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Special Offer Banner in the middle */}
          <div className="my-6 p-3 bg-white rounded-lg shadow-sm">
            <h3 className="text-base font-semibold mb-2">Special Offer</h3>
            <div className="p-3 bg-primary-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Get 20% off on formal wear</p>
              <p className="text-xl font-bold text-primary-500 mb-2">FORMAL20</p>
              <p className="text-xs text-gray-500">Valid until Dec 31, 2024</p>
            </div>
          </div>

          {/* Second half of products */}
          <div className="grid grid-cols-2 gap-3">
            {secondHalfProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <FooterText />
          </div>
        </main>
      </div>
    </div>
  );
};