import { useQuery } from "@tanstack/react-query";
import categoryData from "@/data/category.json";
import subcategoryData from "@/data/subcategory.json";

export const useCategoryData = (categoryId?: string) => {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => {
      const category = categoryData.categories.find(cat => cat.id === categoryId);
      const subcategories = subcategoryData.subcategories.filter(
        subcat => subcat.categoryId === categoryId
      );
      return { category, subcategories };
    },
  });
};