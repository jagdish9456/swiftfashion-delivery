import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategorySection } from "@/components/categories/CategorySection";
import { GridCategories } from "@/components/categories/GridCategories";
import { OfferBanners } from "@/components/banners/OfferBanners";
import { FullWidthBanner } from "@/components/banners/FullWidthBanner";
import { TopChoices } from "@/components/sections/TopChoices";
import { ClothingCategories } from "@/components/categories/ClothingCategories";
import { DealsSection } from "@/components/sections/DealsSection";
import { ChristmasBanner } from "@/components/banners/ChristmasBanner";
import { TopProducts } from "@/components/sections/TopProducts";
import { FooterText } from "@/components/layout/FooterText";
import { useNavigate } from "react-router-dom";

export const Index = () => {
  const navigate = useNavigate();

  const handleBannerClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <main className="pt-[116px]">
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