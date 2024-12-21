import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type ClothingCategoryRowProps = {
  title: string;
  categoryId: string;
  products: Product[];
};

export const ClothingCategoryRow = ({
  title,
  categoryId,
  products,
}: ClothingCategoryRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4"
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start w-[160px] flex-none">
            <ProductCard {...product} />
          </div>
        ))}
        <div className="snap-start flex-none w-[100px] flex items-center justify-center">
          <Button
            variant="ghost"
            className="h-full text-primary-500 hover:text-primary-600"
            onClick={() => navigate(`/category/${categoryId}`)}
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};