import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    brand: string;
    seller: string;
    size: string;
    quantity: number;
    price: number;
    originalPrice: number;
    discount: string;
    image: string;
    returnDays: number;
  };
}

export const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="bg-white p-4 border-b">
      <div className="flex gap-4">
        <div className="relative w-24 h-32 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded"
          />
          <input
            type="checkbox"
            className="absolute top-2 left-2 h-4 w-4 rounded border-gray-300"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{item.brand}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.name}</p>
              <p className="text-xs text-gray-500 mt-1">Sold by: {item.seller}</p>
            </div>
            <button className="p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">Size: {item.size}</span>
              <span className="text-sm">Qty: {item.quantity}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className="font-semibold">₹{item.price}</span>
            <span className="text-gray-500 line-through text-sm">₹{item.originalPrice}</span>
            <Badge variant="secondary" className="bg-primary-50 text-primary-700">
              {item.discount}
            </Badge>
          </div>

          <div className="flex items-center gap-1 mt-3 text-sm">
            <span className="text-gray-500">{item.returnDays} days</span>
            <span className="text-gray-500">return available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
