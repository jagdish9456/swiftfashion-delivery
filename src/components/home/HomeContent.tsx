import { DealsSection } from "@/components/sections/DealsSection";
import { ChristmasBanner } from "@/components/banners/ChristmasBanner";
import { GridCategories } from "@/components/categories/GridCategories";
import { CategorySection } from "@/components/categories/CategorySection";
import { OfferBanners } from "@/components/banners/OfferBanners";
import { TopProducts } from "@/components/sections/TopProducts";
import { ClothingCategories } from "@/components/categories/ClothingCategories";
import { TopChoices } from "@/components/sections/TopChoices";
import { FooterText } from "@/components/layout/FooterText";

export const HomeContent = () => {
  return (
    <>
      <DealsSection />
      <ChristmasBanner />
      <GridCategories />
      <CategorySection />
      <OfferBanners />
      <TopProducts />
      <ClothingCategories />
      <TopChoices />
      <FooterText />
    </>
  );
};