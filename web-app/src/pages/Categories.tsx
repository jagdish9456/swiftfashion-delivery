import { useParams } from "react-router-dom";
import { FooterText } from "@/components/layout/FooterText";
import { useEffect, useState, useRef, useCallback } from "react";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { ProductList } from "@/components/categories/ProductList";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { CategorySidebar } from "@/components/categories/CategorySidebar";
import { NewArrivalsBanner } from "@/components/categories/NewArrivalsBanner";

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
    brand: "EssentialWear",
    images: [{
      id: "img1",
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      alt: "Classic White T-Shirt",
      isDefault: true
    }]
  },
  {
    id: "2",
    name: "Slim Fit Dark Denim Jeans",
    price: 79.99,
    image: "/placeholder.svg",
    description: "Classic dark wash slim fit jeans with stretch comfort",
    brand: "EssentialWear",
    images: [{
      id: "img2",
      url: "/placeholder.svg",
      alt: "Slim Fit Dark Denim Jeans",
      isDefault: true
    }]
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 89.99,
    image: "/placeholder.svg",
    description: "Light and breezy floral print dress perfect for summer days",
    brand: "EssentialWear",
    images: [{
      id: "img3",
      url: "/placeholder.svg",
      alt: "Floral Summer Dress",
      isDefault: true
    }]
  },
  {
    id: "4",
    name: "Wool Blend Winter Coat",
    price: 199.99,
    image: "/placeholder.svg",
    description: "Elegant wool blend coat for cold winter days",
    brand: "EssentialWear",
    images: [{
      id: "img4",
      url: "/placeholder.svg",
      alt: "Wool Blend Winter Coat",
      isDefault: true
    }]
  },
  {
    id: "5",
    name: "Athletic Performance Shorts",
    price: 34.99,
    image: "/placeholder.svg",
    description: "Moisture-wicking athletic shorts for high-performance activities",
    brand: "EssentialWear",
    images: [{
      id: "img5",
      url: "/placeholder.svg",
      alt: "Athletic Performance Shorts",
      isDefault: true
    }]
  },
  {
    id: "6",
    name: "Silk Evening Gown",
    price: 299.99,
    image: "/placeholder.svg",
    description: "Elegant silk evening gown for special occasions",
    brand: "EssentialWear",
    images: [{
      id: "img6",
      url: "/placeholder.svg",
      alt: "Silk Evening Gown",
      isDefault: true
    }]
  },
  {
    id: "7",
    name: "Leather Biker Jacket",
    price: 249.99,
    image: "/placeholder.svg",
    description: "Classic leather motorcycle jacket with quilted lining",
    brand: "EssentialWear",
    images: [{
      id: "img7",
      url: "/placeholder.svg",
      alt: "Leather Biker Jacket",
      isDefault: true
    }]
  },
  {
    id: "8",
    name: "Yoga Leggings",
    price: 49.99,
    image: "/placeholder.svg",
    description: "High-waisted yoga leggings with moisture-wicking fabric",
    brand: "EssentialWear",
    images: [{
      id: "img8",
      url: "/placeholder.svg",
      alt: "Yoga Leggings",
      isDefault: true
    }]
  },
  {
    id: "9",
    name: "Striped Business Shirt",
    price: 69.99,
    image: "/placeholder.svg",
    description: "Professional striped shirt for business attire",
    brand: "EssentialWear",
    images: [{
      id: "img9",
      url: "/placeholder.svg",
      alt: "Striped Business Shirt",
      isDefault: true
    }]
  },
  {
    id: "10",
    name: "Cashmere Sweater",
    price: 159.99,
    image: "/placeholder.svg",
    description: "Soft and warm cashmere sweater for cold weather",
    brand: "EssentialWear",
    images: [{
      id: "img10",
      url: "/placeholder.svg",
      alt: "Cashmere Sweater",
      isDefault: true
    }]
  },
  {
    id: "11",
    name: "Cargo Pants",
    price: 59.99,
    image: "/placeholder.svg",
    description: "Durable cargo pants with multiple pockets",
    brand: "EssentialWear",
    images: [{
      id: "img11",
      url: "/placeholder.svg",
      alt: "Cargo Pants",
      isDefault: true
    }]
  },
  {
    id: "12",
    name: "Summer Beach Shorts",
    price: 39.99,
    image: "/placeholder.svg",
    description: "Quick-dry beach shorts with fun summer patterns",
    brand: "EssentialWear",
    images: [{
      id: "img12",
      url: "/placeholder.svg",
      alt: "Summer Beach Shorts",
      isDefault: true
    }]
  },
  {
    id: "13",
    name: "Puffer Jacket",
    price: 129.99,
    image: "/placeholder.svg",
    description: "Warm puffer jacket with water-resistant finish",
    brand: "EssentialWear",
    images: [{
      id: "img13",
      url: "/placeholder.svg",
      alt: "Puffer Jacket",
      isDefault: true
    }]
  },
  {
    id: "14",
    name: "Linen Summer Shirt",
    price: 54.99,
    image: "/placeholder.svg",
    description: "Breathable linen shirt perfect for summer days",
    brand: "EssentialWear",
    images: [{
      id: "img14",
      url: "/placeholder.svg",
      alt: "Linen Summer Shirt",
      isDefault: true
    }]
  },
  {
    id: "15",
    name: "Pleated Midi Skirt",
    price: 69.99,
    image: "/placeholder.svg",
    description: "Elegant pleated midi skirt for office wear",
    brand: "EssentialWear",
    images: [{
      id: "img15",
      url: "/placeholder.svg",
      alt: "Pleated Midi Skirt",
      isDefault: true
    }]
  },
  {
    id: "16",
    name: "Running Shoes",
    price: 119.99,
    image: "/placeholder.svg",
    description: "Lightweight running shoes with cushioned sole",
    brand: "EssentialWear",
    images: [{
      id: "img16",
      url: "/placeholder.svg",
      alt: "Running Shoes",
      isDefault: true
    }]
  },
  {
    id: "17",
    name: "Denim Jacket",
    price: 89.99,
    image: "/placeholder.svg",
    description: "Classic denim jacket with button closure",
    brand: "EssentialWear",
    images: [{
      id: "img17",
      url: "/placeholder.svg",
      alt: "Denim Jacket",
      isDefault: true
    }]
  },
  {
    id: "18",
    name: "Formal Blazer",
    price: 149.99,
    image: "/placeholder.svg",
    description: "Tailored blazer for professional settings",
    brand: "EssentialWear",
    images: [{
      id: "img18",
      url: "/placeholder.svg",
      alt: "Formal Blazer",
      isDefault: true
    }]
  },
  {
    id: "19",
    name: "Printed Maxi Dress",
    price: 99.99,
    image: "/placeholder.svg",
    description: "Flowing maxi dress with bohemian print",
    brand: "EssentialWear",
    images: [{
      id: "img19",
      url: "/placeholder.svg",
      alt: "Printed Maxi Dress",
      isDefault: true
    }]
  },
  {
    id: "20",
    name: "Thermal Base Layer",
    price: 44.99,
    image: "/placeholder.svg",
    description: "Thermal base layer for cold weather activities",
    brand: "EssentialWear",
    images: [{
      id: "img20",
      url: "/placeholder.svg",
      alt: "Thermal Base Layer",
      isDefault: true
    }]
  },
];

export const Categories = () => {
  const { id } = useParams();
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, 16));
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
  };

  const midPoint = Math.min(8, Math.floor(displayedProducts.length / 2));
  const firstHalfProducts = displayedProducts.slice(0, midPoint);
  const secondHalfProducts = displayedProducts.slice(midPoint);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CategoryHeader id={id} onOpenFilter={() => setIsFilterOpen(true)} />
      <CategorySidebar categories={categories} />

      <div className="flex-1 ml-16 mt-[41px]">
        <NewArrivalsBanner categoryId={id} />

        <main className="p-4">
          <ProductList
            products={firstHalfProducts}
            isLoading={false}
          />

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
