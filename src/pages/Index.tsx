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
import { ActiveOrderBar } from "@/components/orders/ActiveOrderBar";

export const Index = () => {
  return (
    <div className="min-h-screen pb-32">
      <Header />
      <main className="pt-[116px]">
        <DealsSection />
        <ChristmasBanner />
        <GridCategories />
        <CategorySection />
        <OfferBanners />
        <TopProducts />
        <ClothingCategories />
        <TopChoices />
        <FooterText />
      </main>
      <ActiveOrderBar />
      <BottomNav />
    </div>
  );
};
