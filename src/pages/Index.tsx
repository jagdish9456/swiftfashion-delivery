import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategorySection } from "@/components/categories/CategorySection";
import { GridCategories } from "@/components/categories/GridCategories";
import { OfferBanners } from "@/components/banners/OfferBanners";
import { TopChoices } from "@/components/sections/TopChoices";
import { ClothingCategories } from "@/components/categories/ClothingCategories";
import { DealsSection } from "@/components/sections/DealsSection";
import { ChristmasBanner } from "@/components/banners/ChristmasBanner";
import { TopProducts } from "@/components/sections/TopProducts";
import { FooterText } from "@/components/layout/FooterText";
import { useNavigate } from "react-router-dom";
import { Sun, Leaf, Sparkles, Flower, Cloud } from "lucide-react";

export const Index = () => {
  const navigate = useNavigate();

  const handleBannerClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="min-h-screen pb-16 relative">
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-[10%] left-[5%]">
          <Sun className="w-24 h-24 text-primary-200" />
        </div>
        <div className="absolute top-[30%] right-[8%]">
          <Leaf className="w-20 h-20 text-primary-200" />
        </div>
        <div className="absolute top-[50%] left-[12%]">
          <Sparkles className="w-16 h-16 text-primary-200" />
        </div>
        <div className="absolute top-[70%] right-[15%]">
          <Flower className="w-24 h-24 text-primary-200" />
        </div>
        <div className="absolute top-[85%] left-[20%]">
          <Cloud className="w-20 h-20 text-primary-200" />
        </div>
      </div>
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent">
          <img 
            src="/lovable-uploads/86e79fd8-4097-4263-bd37-30056aff88a1.png" 
            alt="Background Pattern" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
      </div>

      <Header />
      <main className="pt-[116px] relative z-10">
        <div onClick={() => handleBannerClick("summer-collection")}>
          <DealsSection />
        </div>
        <div onClick={() => handleBannerClick("christmas-special")}>
          <ChristmasBanner />
        </div>
        <GridCategories />
        <CategorySection />
        <div onClick={() => handleBannerClick("designer-collection")}>
          <OfferBanners />
        </div>
        <TopProducts />
        <ClothingCategories />
        <TopChoices />
        <FooterText />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;