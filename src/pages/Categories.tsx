import { Filter } from "lucide-react";
import { ProductCard } from "@/components/categories/ProductCard";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { FooterText } from "@/components/layout/FooterText";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, useRef, useCallback } from "react";
import { FilterSheet } from "@/components/filters/FilterSheet";

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
  {
    id: "13",
    name: "Designer Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",
  },
  {
    id: "14",
    name: "Leather Briefcase",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
  },
  {
    id: "15",
    name: "Silk Scarf",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500",
  },
  {
    id: "16",
    name: "Cufflinks Set",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
  },
  {
    id: "17",
    name: "Designer Sunglasses",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
  },
  {
    id: "18",
    name: "Premium Belt",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=500",
  },
  {
    id: "19",
    name: "Formal Hat",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=500",
  },
  {
    id: "20",
    name: "Pocket Square Set",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=500",
  },
  {
    id: "21",
    name: "Formal Socks Pack",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500",
  },
  {
    id: "22",
    name: "Business Card Holder",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1607435097405-db48f377bff6?w=500",
  },
  {
    id: "23",
    name: "Dress Shirt Set",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=500",
  },
  {
    id: "24",
    name: "Formal Umbrella",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1517144447511-aebb25bbc5d2?w=500",
  }
];

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

export const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [displayedProducts, setDisplayedProducts] = useState<typeof allProducts>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Initial load
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

  const handleApplyFilters = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
    // Here you would typically filter the products based on the selected filters
    // For now, we'll just reset the products list
    setDisplayedProducts(allProducts.slice(0, 16));
    setHasMore(true);
  };

  // Split products for special offer banner
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

      {/* Filter Sheet */}
      <FilterSheet
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        selectedFilters={selectedFilters}
        onApplyFilters={handleApplyFilters}
      />

      {/* Main Content */}
      <div className="flex-1 mt-[41px]">
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
            {secondHalfProducts.map((product, index) => (
              <div
                ref={index === secondHalfProducts.length - 1 ? lastProductRef : null}
                key={product.id}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* Loading skeletons */}
          {isLoading && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              {[1, 2, 3, 4].map((n) => (
                <ProductSkeleton key={n} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
