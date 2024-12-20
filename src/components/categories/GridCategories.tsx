import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "formal-wear",
    name: "Formal Wear",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
  },
  {
    id: "casual-wear",
    name: "Casual Wear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
  {
    id: "ethnic-wear",
    name: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
  },
  {
    id: "sportswear",
    name: "Sportswear",
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=200",
  },
  {
    id: "winter-collection",
    name: "Winter Collection",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=200",
  },
  {
    id: "summer-collection",
    name: "Summer Collection",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=200",
  },
  {
    id: "footwear",
    name: "Footwear",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200",
  },
  {
    id: "designer-wear",
    name: "Designer Wear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200",
  },
  {
    id: "kids-wear",
    name: "Kids Wear",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200",
  },
  {
    id: "party-wear",
    name: "Party Wear",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
  },
  {
    id: "traditional-wear",
    name: "Traditional Wear",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
  },
];

export const GridCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-primary-50 hover:border-primary-200"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-center line-clamp-2">
              {category.name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};