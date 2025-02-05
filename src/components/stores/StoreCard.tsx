import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StoreCardProps {
  name: string;
  image: string;
  discount: number;
  deliveryTime: string;
  type: string;
}

export const StoreCard = ({
  name,
  image,
  discount,
  deliveryTime,
  type,
}: StoreCardProps) => {
  return (
    <div className="flex flex-col gap-2 min-w-[160px] p-2">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover"
        />
        <Badge className="absolute top-2 left-2 bg-red-500">
          {discount}% OFF
        </Badge>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-sm truncate">{name}</h3>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="h-3 w-3" />
          <span className="text-xs">{deliveryTime}</span>
        </div>
        <span className="text-xs text-gray-500">{type}</span>
      </div>
    </div>
  );
};
