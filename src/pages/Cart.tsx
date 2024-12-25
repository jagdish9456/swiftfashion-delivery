import { ArrowLeft, Heart, ChevronRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { PaymentButton } from "@/components/common/PaymentButton";

export const Cart = () => {
  const navigate = useNavigate();
  const deliveryAddress = {
    name: "John",
    pincode: "500032",
    address: "123 Fashion Street, Downtown Shopping District"
  };

  const cartItems = [
    {
      id: "1",
      name: "Premium Cotton Casual T-Shirt",
      brand: "Fashion Basics",
      seller: "Fashion Retail Co",
      size: "XL",
      quantity: 1,
      price: 29.99,
      originalPrice: 49.99,
      discount: "40% OFF",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
      returnDays: 30
    },
    {
      id: "2",
      name: "Slim Fit Denim Jeans",
      brand: "Denim Culture",
      seller: "Fashion Retail Co",
      size: "32",
      quantity: 1,
      price: 79.99,
      originalPrice: 129.99,
      discount: "38% OFF",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
      returnDays: 30
    }
  ];

  const handlePayment = () => {
    // Existing payment handling logic
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-40">
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

      <div className="bg-white p-4 mt-4">
        <div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Deliver to: </span>
            <span>{deliveryAddress.name}, {deliveryAddress.pincode}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{deliveryAddress.address}</p>
        </div>
      </div>

      <div className="mt-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="bg-white mt-4">
        <button className="flex items-center justify-between w-full p-4 border-b">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <span className="font-medium">Apply Coupon</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
        <CartSummary items={cartItems} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img src="/placeholder.svg" alt="Secure Payment" className="h-5" />
            <img src="/placeholder.svg" alt="Fast Delivery" className="h-5" />
            <img src="/placeholder.svg" alt="Quality Assured" className="h-5" />
          </div>
        </div>
        <PaymentButton
          amount={cartItems.reduce((sum, item) => sum + item.price, 0)}
          disabled={cartItems.length === 0}
          onClick={handlePayment}
        />
        <p className="text-xs text-center mt-3 text-gray-500">
          By placing the order, you agree to our{" "}
          <a href="#" className="text-primary-500">Terms of Use</a> and{" "}
          <a href="#" className="text-primary-500">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};
