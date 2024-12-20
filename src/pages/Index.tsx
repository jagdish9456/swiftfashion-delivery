import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategorySection } from "@/components/categories/CategorySection";
import { GridCategories } from "@/components/categories/GridCategories";
import { OfferBanners } from "@/components/banners/OfferBanners";
import { FullWidthBanner } from "@/components/banners/FullWidthBanner";
import { Button } from "@/components/ui/button";

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

export const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <main className="pt-[116px]">
        <DealsSection />
        <GridCategories />
        <FullWidthBanner />
        <CategorySection />
        <OfferBanners />
        <CategorySection />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;