import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartPopupProps = {
  items: CartItem[];
  onClose: () => void;
};

export const CartPopup = ({ items, onClose }: CartPopupProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transform transition-transform z-50">
      <div className="max-w-lg mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary-500" />
            <span className="font-medium">{items.length} items in cart</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-semibold">${total.toFixed(2)}</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600">
            View Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
