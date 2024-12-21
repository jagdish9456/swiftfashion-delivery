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

const menCategories = [
  {
    id: "mens-suits",
    name: "Suits & Blazers",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200",
  },
  {
    id: "mens-shirts",
    name: "Formal Shirts",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200",
  },
  {
    id: "mens-casual",
    name: "Casual Wear",
    image: "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?w=200",
  },
  {
    id: "mens-jeans",
    name: "Jeans & Trousers",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200",
  },
  {
    id: "mens-activewear",
    name: "Activewear",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200",
  },
  {
    id: "mens-outerwear",
    name: "Jackets & Coats",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200",
  },
  {
    id: "mens-accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1624538000860-24e2d198c254?w=200",
  },
  {
    id: "mens-shoes",
    name: "Formal Shoes",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=200",
  },
  {
    id: "mens-sneakers",
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200",
  },
  {
    id: "mens-ethnic",
    name: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1579969406275-0b37fa82deca?w=200",
  },
  {
    id: "mens-loungewear",
    name: "Loungewear",
    image: "https://images.unsplash.com/photo-1617952385804-7b326fa42766?w=200",
  },
  {
    id: "mens-swimwear",
    name: "Swimwear",
    image: "https://images.unsplash.com/photo-1570958936324-c8f0e856f0f7?w=200",
  },
];

const womenCategories = [
  {
    id: "womens-dresses",
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
  },
  {
    id: "womens-tops",
    name: "Tops & Blouses",
    image: "https://images.unsplash.com/photo-1551048632-24e444b48a3e?w=200",
  },
  {
    id: "womens-ethnic",
    name: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
  },
  {
    id: "womens-western",
    name: "Western Wear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200",
  },
  {
    id: "womens-activewear",
    name: "Activewear",
    image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=200",
  },
  {
    id: "womens-outerwear",
    name: "Jackets & Coats",
    image: "https://images.unsplash.com/photo-1591900947067-851789555ef3?w=200",
  },
  {
    id: "womens-accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=200",
  },
  {
    id: "womens-footwear",
    name: "Footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200",
  },
  {
    id: "womens-bags",
    name: "Handbags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200",
  },
  {
    id: "womens-jewellery",
    name: "Jewellery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200",
  },
  {
    id: "womens-lingerie",
    name: "Lingerie",
    image: "https://images.unsplash.com/photo-1616530213520-c7b6e8365f47?w=200",
  },
  {
    id: "womens-beauty",
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200",
  },
];

export const GridCategories = ({ gender = "all" }: { gender?: "all" | "men" | "women" }) => {
  const navigate = useNavigate();

  const displayCategories = gender === "men" 
    ? menCategories 
    : gender === "women" 
    ? womenCategories 
    : categories;

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="px-3 py-4">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {displayCategories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className="h-auto p-2 flex flex-col items-center gap-1 hover:bg-primary-50 hover:border-primary-200"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] font-medium text-center line-clamp-2">
              {category.name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};