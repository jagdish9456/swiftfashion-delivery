import { ArrowRight } from "lucide-react";

const deals = [
  {
    id: 1,
    title: "Deals of the Day",
    subtitle: "60% OFF",
    bgColor: "bg-[#F97316]",
  },
  {
    id: 2,
    title: "Unlimited Flat Deal",
    subtitle: "Big orders",
    bgColor: "bg-[#FCD34D]",
  },
  {
    id: 3,
    title: "Fastest Deliveries",
    subtitle: "See offers",
    bgColor: "bg-[#10B981]",
  },
];

export const DealsSection = () => {
  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-3 gap-3">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className={`${deal.bgColor} rounded-lg p-4 text-white relative group cursor-pointer`}
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-1">{deal.title}</h3>
              <div className="flex items-center text-xs">
                <span>{deal.subtitle}</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
