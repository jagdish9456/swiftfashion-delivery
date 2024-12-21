import { MainLayout } from "@/components/layout/MainLayout";
import { ClothingCategories } from "@/components/categories/ClothingCategories";
import { useParams } from "react-router-dom";

export const Categories = () => {
  const { id } = useParams();
  
  return (
    <MainLayout>
      <ClothingCategories categoryId={id} />
    </MainLayout>
  );
};