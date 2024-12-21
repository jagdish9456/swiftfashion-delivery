import { ArrowLeft, Heart, ChevronRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartFooter } from "@/components/cart/CartFooter";

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
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-white p-4 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-medium">SHOPPING BAG</h1>
        </div>
        <button className="p-2">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white p-4 mt-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Deliver to: </span>
            <span>{deliveryAddress.name}, {deliveryAddress.pincode}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{deliveryAddress.address}</p>
        </div>
        <button className="text-primary-500 font-medium">Change</button>
      </div>

      <div className="mt-2">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="bg-white mt-2">
        <button className="flex items-center justify-between w-full p-4 border-b">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <span className="font-medium">Apply Coupon</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
        <CartSummary items={cartItems} />
      </div>

      <CartFooter items={cartItems} />
    </div>
  );
};