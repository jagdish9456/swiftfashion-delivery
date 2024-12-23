import { useParams } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { CategoryList } from "@/components/categories/CategoryList";
import { CategorySidebar } from "@/components/categories/CategorySidebar";
import { categories } from "@/data/category.json";

export const Categories = () => {
  const { id } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const category = categories.find(cat => cat.id === id);

  if (!category) {
    return <div>Category not found</div>;
  }

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const sidebarCategories = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon
  }));

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <CategoryHeader 
        category={category}
        onOpenFilter={handleOpenFilter}
      />
      <div className="container mx-auto px-4 flex gap-4 pt-4">
        <aside className="hidden md:block w-64">
          <CategorySidebar 
            categories={sidebarCategories}
            currentCategory={category}
          />
        </aside>
        <main className="flex-1">
          <CategoryList category={category} />
        </main>
      </div>
      <FilterSheet
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        onApplyFilters={handleApplyFilters}
      />
      <BottomNav />
    </div>
  );
};

export default Categories;