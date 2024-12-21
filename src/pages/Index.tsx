import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategorySection } from "@/components/categories/CategorySection";
import { GridCategories } from "@/components/categories/GridCategories";
import { OfferBanners } from "@/components/banners/OfferBanners";
import { FullWidthBanner } from "@/components/banners/FullWidthBanner";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/categories/ProductCard";
import { TopChoices } from "@/components/sections/TopChoices";
import { useNavigate } from "react-router-dom";

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
      name: "Elegant Evening Dress",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
    },
    {
      id: "tp2",
      name: "Designer Blazer",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500",
    },
    {
      id: "tp3",
      name: "Premium Denim Jeans",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    },
    {
      id: "tp4",
      name: "Cashmere Sweater",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500",
    },
    {
      id: "tp5",
      name: "Silk Blouse",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500",
    },
    {
      id: "tp6",
      name: "Leather Jacket",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    },
    {
      id: "tp7",
      name: "Formal Trousers",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    },
    {
      id: "tp8",
      name: "Summer Dress",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
    },
    {
      id: "tp9",
      name: "Winter Coat",
      price: 329.99,
      image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500",
    },
    {
      id: "tp10",
      name: "Designer Scarf",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=500",
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

const CategoryRowSection = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: "1",
      name: "Elegant Watch",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
    },
    {
      id: "2",
      name: "Designer Bag",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    },
    {
      id: "3",
      name: "Sunglasses",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    },
    {
      id: "4",
      name: "Leather Wallet",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    },
    {
      id: "5",
      name: "Smart Band",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500",
    }
  ];

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Featured Categories</h2>
        <Button 
          variant="ghost" 
          className="text-primary-500 hover:text-primary-600"
          onClick={() => navigate('/category/all')}
        >
          View All
        </Button>
      </div>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4">
        {products.map((product) => (
          <div key={product.id} className="snap-start w-[160px] flex-none">
            <ProductCard {...product} />
          </div>
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
        <DealsSection />
        <ChristmasBanner />
        <GridCategories />
        <CategoryRowSection />
        <FullWidthBanner />
        <CategorySection />
        <OfferBanners />
        <TopProducts />
        <TopChoices />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
