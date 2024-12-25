import { DealsSection } from "@/components/sections/DealsSection";
import { TopChoices } from "@/components/sections/TopChoices";
import { TopProducts } from "@/components/sections/TopProducts";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { GridCategories } from "@/components/categories/GridCategories";

export function Index() {
  return (
    <div className="pb-16">
      <Header />
      <GridCategories />
      <DealsSection />
      <TopChoices />
      <TopProducts />
      <BottomNav />
    </div>
  );
}