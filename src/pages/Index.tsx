import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategorySection } from "@/components/categories/CategorySection";
import { GridCategories } from "@/components/categories/GridCategories";
import { OfferBanners } from "@/components/banners/OfferBanners";
import { FullWidthBanner } from "@/components/banners/FullWidthBanner";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/categories/ProductCard";

const DealsSection = () => (
  <div className="grid grid-cols-3 gap-4 px-4 py-6">
    <Button
      className="bg-red-100 hover:bg-red-200 text-red-600 h-auto py-4 flex flex-col"
    >
      <span className="text-sm font-semibold">Deals of</span>
      <span className="text-xs">the Day</span>
      <span className="text-xs mt-1">60% OFF →</span>
    </Button>
    <Button
      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600 h-auto py-4 flex flex-col"
    >
      <span className="text-sm font-semibold">Unlimited</span>
      <span className="text-xs">Flat Deal</span>
      <span className="text-xs mt-1">Big orders →</span>
    </Button>
    <Button
      className="bg-green-100 hover:bg-green-200 text-green-600 h-auto py-4 flex flex-col"
    >
      <span className="text-sm font-semibold">Fastest</span>
      <span className="text-xs">Deliveries</span>
      <span className="text-xs mt-1">See offers →</span>
    </Button>
  </div>
);

const ChristmasBanner = () => (
  <div className="px-4 py-2">
    <div className="h-24 rounded-lg overflow-hidden relative">
      <img
        src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1200"
        alt="Christmas Special Offer"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl font-bold">Christmas Special</h2>
          <p className="text-sm">Up to 50% off on selected items</p>
        </div>
      </div>
    </div>
  </div>
);

const TopProducts = () => {
  const products = [
    {
      id: "tp1",
      name: "Premium Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
    },
    {
      id: "tp2",
      name: "Designer Sunglasses",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    },
    {
      id: "tp3",
      name: "Leather Wallet",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    },
    {
      id: "tp4",
      name: "Wireless Earbuds",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    },
    {
      id: "tp5",
      name: "Smart Band",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500",
    },
    {
      id: "tp6",
      name: "Backpack",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    },
    {
      id: "tp7",
      name: "Running Shoes",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    {
      id: "tp8",
      name: "Wireless Charger",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=500",
    },
    {
      id: "tp9",
      name: "Laptop Sleeve",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500",
    },
    {
      id: "tp10",
      name: "Water Bottle",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    },
  ];

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Top Products</h2>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <main className="pt-[116px]">
        <ChristmasBanner />
        <DealsSection />
        <GridCategories />
        <FullWidthBanner />
        <CategorySection />
        <OfferBanners />
        <TopProducts />
        <CategorySection />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;