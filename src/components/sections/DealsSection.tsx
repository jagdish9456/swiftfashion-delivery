import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const deals = [
  {
    id: 1,
    title: "Winter Collection",
    discount: "50% OFF",
    bgColor: "bg-[#FEF7CD]",
  },
  {
    id: 2,
    title: "Formal Wear",
    discount: "30% OFF",
    bgColor: "bg-[#E5DEFF]",
  },
  {
    id: 3,
    title: "Summer Sale",
    discount: "40% OFF",
    bgColor: "bg-[#FFDEE2]",
  },
];

export const DealsSection = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Deals of the Day</h2>
        <Button variant="ghost" className="text-sm text-muted-foreground">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className={`${deal.bgColor} rounded-lg p-4 text-center transition-transform hover:scale-[1.02]`}
          >
            <h3 className="text-base font-medium mb-1">{deal.title}</h3>
            <p className="text-xl font-bold text-primary">{deal.discount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};