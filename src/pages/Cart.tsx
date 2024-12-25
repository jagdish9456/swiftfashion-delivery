import { ArrowLeft, Heart, ChevronRight, Tag, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartFooter } from "@/components/cart/CartFooter";
import { ProductsCarousel } from "@/components/product/ProductsCarousel";

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
      name: "Dettol Antiseptic Liquid",
      brand: "Dettol",
      seller: "RetailNet",
      size: "125 ml",
      quantity: 1,
      price: 80,
      originalPrice: 95,
      discount: "15% OFF",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
    },
    // ... Add more items
  ];

  const suggestedItems = [
    {
      id: "1",
      name: "Fresh fruits pack",
      price: 150,
      originalPrice: 499,
      discount: "70% OFF",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
    },
    // ... Add more items
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-white p-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1.5">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-base font-medium">Your Cart</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-primary-500 font-medium">Clear</button>
        </div>
      </div>

      <div className="bg-white p-3 mt-1 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">HOME</span>
            <span className="text-xs text-gray-500 truncate">| {deliveryAddress.address}</span>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>

      <div className="bg-green-50 p-3 mt-1">
        <p className="text-sm text-green-600">
          ₹238 saved! on this order, including ₹26 with Swiggy One!
        </p>
      </div>

      <div className="bg-white p-3 mt-1">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-medium">SAVE50</h3>
            <p className="text-xs text-gray-500">Offer applied on the bill</p>
          </div>
          <button className="text-red-500 text-sm font-medium">Remove</button>
        </div>
        <button className="w-full mt-3 text-sm text-primary-500 font-medium flex items-center justify-center gap-1">
          View more coupons & offers <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-1">
        <div className="bg-white p-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-medium">Review your Order</h3>
            <button className="text-primary-500 text-xs font-medium">Why?</button>
          </div>
          
          <div className="border-b pb-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base font-medium">Delivery 1</span>
              <div className="bg-green-50 px-2 py-0.5 rounded text-xs text-green-600 font-medium flex items-center gap-1">
                <span>5 Mins</span>
                <span className="text-[10px]">Superfast</span>
              </div>
              <span className="ml-auto text-xs text-gray-500">4 items</span>
            </div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white mt-1 p-3">
        <p className="text-sm text-center">
          Missed Something? <span className="text-primary-500">Add more items</span>
        </p>
      </div>

      <div className="bg-white mt-1 p-3">
        <h3 className="text-base font-medium mb-3">Your last minute add-ons</h3>
        <ProductsCarousel products={suggestedItems} title="" />
      </div>

      <div className="bg-white mt-1 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-primary-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium">I don't need a bag!</h3>
              <p className="text-xs text-gray-500">Take the pledge for a greener future</p>
            </div>
          </div>
          <div className="w-10 h-6 bg-gray-200 rounded-full relative">
            <div className="absolute right-0 w-6 h-6 bg-white rounded-full shadow" />
          </div>
        </div>
      </div>

      <div className="bg-white mt-1 p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium">Say thanks with a tip</h3>
          <button className="text-primary-500">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          While you're celebrating with your loved ones, our delivery partners are working hard. 
          Tip them and make their festive season special too!
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[10, 20, 30, "Other"].map((amount) => (
            <button
              key={amount}
              className={`p-2 border rounded-lg text-sm ${
                amount === 20
                  ? "border-primary-500 bg-primary-50 text-primary-500"
                  : "border-gray-200"
              }`}
            >
              {typeof amount === "number" ? `₹${amount}` : amount}
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src="/placeholder.svg" alt="PhonePe" className="h-8 w-8" />
            <div>
              <p className="text-sm">Pay using</p>
              <p className="text-sm font-medium">PhonePe UPI</p>
            </div>
          </div>
          <button className="text-primary-500 font-medium">Change</button>
        </div>
        <button className="w-full bg-primary-500 text-white p-3 rounded-lg font-medium flex items-center justify-center gap-2">
          <span>Slide to Pay</span>
          <span>₹386</span>
        </button>
      </div>
    </div>
  );
};