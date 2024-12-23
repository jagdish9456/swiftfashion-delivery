import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import categoryData from "@/data/category.json";

type Category = {
  id: string;
  name: string;
  image: string;
  gender: string;
};

export const GridCategories = ({ gender = "all" }: { gender?: "all" | "men" | "women" }) => {
  const navigate = useNavigate();

  const { data: categories } = useQuery({
    queryKey: ["categories", gender],
    queryFn: () => {
      const filteredCategories = categoryData.categories.filter((category) => {
        if (gender === "all") return true;
        if (gender === "men") return category.gender === "male" || category.gender === "all";
        if (gender === "women") return category.gender === "female" || category.gender === "all";
        return true;
      });
      return filteredCategories;
    },
  });

  if (!categories) return null;

  return (
    <div className="px-3 py-4">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className="h-auto p-2 flex flex-col items-center gap-1 hover:bg-primary-50 hover:border-primary-200"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] font-medium text-center line-clamp-2 w-full px-0.5">
              {category.name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};