import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreCard } from "@/components/stores/StoreCard";

const stores = [
  {
    name: "Fashion Store",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    discount: 40,
    deliveryTime: "30-40 mins",
    type: "Clothing & Accessories",
  },
  {
    name: "Trendy Boutique",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5",
    discount: 30,
    deliveryTime: "25-35 mins",
    type: "Fashion & Style",
  },
  {
    name: "Urban Wear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    discount: 25,
    deliveryTime: "35-45 mins",
    type: "Street Fashion",
  },
  {
    name: "Elite Fashion",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
    discount: 35,
    deliveryTime: "20-30 mins",
    type: "Luxury Wear",
  },
  {
    name: "Style Hub",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2",
    discount: 45,
    deliveryTime: "30-40 mins",
    type: "Fashion Outlet",
  },
];

export const CategorySection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <div className="relative px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Popular Near You</h2>
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
        className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
      >
        {stores.map((store) => (
          <div key={store.name} className="snap-start w-[30%] flex-none min-w-[140px]">
            <StoreCard {...store} />
          </div>
        ))}
      </div>
    </div>
  );
};
