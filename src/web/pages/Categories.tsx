import { useParams } from "react-router-dom";
import { useState } from "react";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { CategoryList } from "@/components/categories/CategoryList";
import { CategorySidebar } from "@/components/categories/CategorySidebar";
import { categories } from "@/data/category.json";

export const Categories = () => {
  const { id } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const category = categories.find(cat => cat.id === id);

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const sidebarCategories = [
    { name: "All", icon: "🏷️" },
    { name: "T-Shirts", icon: "👕" },
    { name: "Shirts", icon: "👔" },
    { name: "Pants", icon: "👖" },
    { name: "Dresses", icon: "👗" },
    { name: "Skirts", icon: "👘" },
    { name: "Jackets", icon: "🧥" },
    { name: "Sweaters", icon: "🧶" },
    { name: "Activewear", icon: "🎽" },
    { name: "Accessories", icon: "👜" },
    { name: "Shoes", icon: "👞" },
    { name: "Bags", icon: "🎒" },
  ];

  return (
    <div className="min-h-screen pb-16">
      <CategoryHeader 
        id={id} 
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
    </div>
  );
};

export default Categories;
