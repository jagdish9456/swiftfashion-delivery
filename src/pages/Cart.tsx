import { ArrowLeft, Heart, ChevronRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartFooter } from "@/components/cart/CartFooter";
import { ActiveOrderBar } from "@/components/orders/ActiveOrderBar";

export const Cart = () => {
  const navigate = useNavigate();
  const deliveryAddress = {
    name: "Jagdish",
    pincode: "500032",
    address: "D-2001, Mantri Celestia, Financial District, Gachibowli, Hyderabad"
  };

  const cartItems = [
    {
      id: "1",
      name: "Men Black Solid Sweatshirt",
      brand: "Allen Solly",
      seller: "RetailNet",
      size: "XXL",
      quantity: 1,
      price: 1158,
      originalPrice: 1899,
      discount: "39% OFF",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
      returnDays: 7
    },
    {
      id: "2",
      name: "Men Grey Printed Brand Logo Printed Sweatshirt",
      brand: "Allen Solly Sport",
      seller: "RetailNet",
      size: "XXL",
      quantity: 1,
      price: 1199,
      originalPrice: 1999,
      discount: "40% OFF",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
      returnDays: 7
    }
  ];

  return (
    <div className="flex flex-col h-screen">
      <ActiveOrderBar className="sticky top-0 z-20" />
      
      <div className="bg-white py-2 px-3 flex items-center justify-between border-b sticky top-12 z-10">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-base font-medium">SHOPPING BAG</h1>
        </div>
        <button className="p-1">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto pb-32">
        <div className="bg-white py-2 px-3 mt-1 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-sm">
              <span className="font-medium">Deliver to: </span>
              <span>{deliveryAddress.name}, {deliveryAddress.pincode}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{deliveryAddress.address}</p>
          </div>
          <button className="text-primary-500 text-sm font-medium">Change</button>
        </div>

        <div className="mt-1">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-white mt-1">
          <button className="flex items-center justify-between w-full py-2 px-3 border-b">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">Apply Coupon</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <CartSummary items={cartItems} />
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0">
        <CartFooter items={cartItems} />
      </div>
    </div>
  );
};