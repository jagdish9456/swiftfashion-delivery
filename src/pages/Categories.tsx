import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { FooterText } from "@/components/layout/FooterText";
import { useEffect, useState, useRef, useCallback } from "react";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { ProductList } from "@/components/categories/ProductList";

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

const allProducts = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "Premium cotton t-shirt perfect for everyday wear",
    brand: "EssentialWear"
  },
  {
    id: "2",
    name: "Slim Fit Dark Denim Jeans",
    price: 79.99,
    image: "/placeholder.svg",
    description: "Classic dark wash slim fit jeans with stretch comfort",
    brand: "EssentialWear"
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 89.99,
    image: "/placeholder.svg",
    description: "Light and breezy floral print dress perfect for summer days",
    brand: "EssentialWear"
  },
  {
    id: "4",
    name: "Wool Blend Winter Coat",
    price: 199.99,
    image: "/placeholder.svg",
    description: "Elegant wool blend coat for cold winter days",
    brand: "EssentialWear"
  },
  {
    id: "5",
    name: "Athletic Performance Shorts",
    price: 34.99,
    image: "/placeholder.svg",
    description: "Moisture-wicking athletic shorts for high-performance activities",
    brand: "EssentialWear"
  },
  {
    id: "6",
    name: "Silk Evening Gown",
    price: 299.99,
    image: "/placeholder.svg",
    description: "Elegant silk evening gown for special occasions",
    brand: "EssentialWear"
  },
  {
    id: "7",
    name: "Leather Biker Jacket",
    price: 249.99,
    image: "/placeholder.svg",
    description: "Classic leather motorcycle jacket with quilted lining",
    brand: "EssentialWear"
  },
  {
    id: "8",
    name: "Yoga Leggings",
    price: 49.99,
    image: "/placeholder.svg",
    description: "High-waisted yoga leggings with moisture-wicking fabric",
    brand: "EssentialWear"
  },
  {
    id: "9",
    name: "Striped Business Shirt",
    price: 69.99,
    image: "/placeholder.svg",
    description: "Professional striped shirt for business attire",
    brand: "EssentialWear"
  },
  {
    id: "10",
    name: "Cashmere Sweater",
    price: 159.99,
    image: "/placeholder.svg",
    description: "Soft and warm cashmere sweater for cold weather",
    brand: "EssentialWear"
  },
  {
    id: "11",
    name: "Cargo Pants",
    price: 59.99,
    image: "/placeholder.svg",
    description: "Durable cargo pants with multiple pockets",
    brand: "EssentialWear"
  },
  {
    id: "12",
    name: "Summer Beach Shorts",
    price: 39.99,
    image: "/placeholder.svg",
    description: "Quick-dry beach shorts with fun summer patterns",
    brand: "EssentialWear"
  },
  {
    id: "13",
    name: "Puffer Jacket",
    price: 129.99,
    image: "/placeholder.svg",
    description: "Warm puffer jacket with water-resistant finish",
    brand: "EssentialWear"
  },
  {
    id: "14",
    name: "Linen Summer Shirt",
    price: 54.99,
    image: "/placeholder.svg",
    description: "Breathable linen shirt perfect for summer days",
    brand: "EssentialWear"
  },
  {
    id: "15",
    name: "Pleated Midi Skirt",
    price: 69.99,
    image: "/placeholder.svg",
    description: "Elegant pleated midi skirt for office wear",
    brand: "EssentialWear"
  },
  {
    id: "16",
    name: "Running Shoes",
    price: 119.99,
    image: "/placeholder.svg",
    description: "Lightweight running shoes with cushioned sole",
    brand: "EssentialWear"
  },
  {
    id: "17",
    name: "Denim Jacket",
    price: 89.99,
    image: "/placeholder.svg",
    description: "Classic denim jacket with button closure",
    brand: "EssentialWear"
  },
  {
    id: "18",
    name: "Formal Blazer",
    price: 149.99,
    image: "/placeholder.svg",
    description: "Tailored blazer for professional settings",
    brand: "EssentialWear"
  },
  {
    id: "19",
    name: "Printed Maxi Dress",
    price: 99.99,
    image: "/placeholder.svg",
    description: "Flowing maxi dress with bohemian print",
    brand: "EssentialWear"
  },
  {
    id: "20",
    name: "Thermal Base Layer",
    price: 44.99,
    image: "/placeholder.svg",
    description: "Thermal base layer for cold weather activities",
    brand: "EssentialWear"
  },
];

export const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [displayedProducts, setDisplayedProducts] = useState<typeof allProducts>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    setDisplayedProducts(allProducts.slice(0, 16));
    setHasMore(allProducts.length > 16);
  }, []);

  const lastProductRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentLength = displayedProducts.length;
      const nextProducts = allProducts.slice(currentLength, currentLength + 8);
      setDisplayedProducts(prev => [...prev, ...nextProducts]);
      setHasMore(currentLength + 8 < allProducts.length);
      setIsLoading(false);
    }, 1500);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    // Filter logic will be implemented here
  };

  const midPoint = Math.min(8, Math.floor(displayedProducts.length / 2));
  const firstHalfProducts = displayedProducts.slice(0, midPoint);
  const secondHalfProducts = displayedProducts.slice(midPoint);

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
          onClick={() => setIsFilterOpen(true)}
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
          <ProductList
            products={firstHalfProducts}
            isLoading={false}
          />

          {/* Special Offer Banner */}
          <div className="my-6 p-3 bg-white rounded-lg shadow-sm">
            <h3 className="text-base font-semibold mb-2">Special Offer</h3>
            <div className="p-3 bg-primary-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Get 20% off on formal wear</p>
              <p className="text-xl font-bold text-primary-500 mb-2">FORMAL20</p>
              <p className="text-xs text-gray-500">Valid until Dec 31, 2024</p>
            </div>
          </div>

          <ProductList
            products={secondHalfProducts}
            isLoading={isLoading}
            lastProductRef={lastProductRef}
          />

          <div className="flex justify-end mt-4">
            <FooterText />
          </div>
        </main>
      </div>

      <FilterSheet
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};
