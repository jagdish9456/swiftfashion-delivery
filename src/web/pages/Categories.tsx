import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { CategoryList } from "@/components/categories/CategoryList";
import { CategorySidebar } from "@/components/categories/CategorySidebar";
import { useParams } from "react-router-dom";
import { categories } from "@/data/category.json";

export const Categories = () => {
  const { id } = useParams();
  const category = categories.find(cat => cat.id === id);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <CategoryHeader category={category} />
      <div className="container mx-auto px-4 flex gap-4 pt-4">
        <aside className="hidden md:block w-64">
          <CategorySidebar currentCategory={category} />
        </aside>
        <main className="flex-1">
          <CategoryList category={category} />
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Categories;