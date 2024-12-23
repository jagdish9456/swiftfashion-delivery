import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ClothingCategories } from "@/components/categories/ClothingCategories";

export const GenderCategories = () => {
  return (
    <div className="min-h-screen pb-16">
      <Header />
      <ClothingCategories />
      <BottomNav />
    </div>
  );
};

export default GenderCategories;