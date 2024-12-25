import { ArrowLeft, ChevronDown, ChevronRight, Home, Tag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

export const Cart = () => {
  const navigate = useNavigate();
  const deliveryAddress = {
    name: "HOME",
    address: "d-2001 d block, mantri celestia, Mantri Celestia..."
  };

  const cartItems = [
    {
      id: "1",
      name: "Dettol Antiseptic Liquid - For First Aid, Floor & Other Surface",
      quantity: 1,
      price: 80,
      originalPrice: 95,
      size: "125 ml",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
      returnDays: 7
    },
    {
      id: "2",
      name: "VEGA Organic Cotton Balls (Pack of 50)",
      quantity: 1,
      price: 60,
      originalPrice: 79,
      size: "1 pack",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
      returnDays: 7
    },
    {
      id: "3",
      name: "Betadine 10% Ointment",
      quantity: 1,
      price: 128,
      originalPrice: 145,
      size: "20 g",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
      returnDays: 7
    },
    {
      id: "4",
      name: "Eveready 1012 AAA Carbon Zinc Batteries - Red",
      quantity: 1,
      price: 54,
      originalPrice: 65,
      size: "4 units",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
      returnDays: 7
    }
  ];

  const lastMinuteItems = [
    {
      id: "1",
      name: "Mad Over Print's Santa Dress Kids",
      price: 150,
      originalPrice: 499,
      quantity: "1 Piece",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
      discount: "6% OFF",
      deliveryTime: "5 mins"
    },
    // ... Add more items
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-white p-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg">Your Cart</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-gray-100 p-2 rounded-full">
            <X className="h-4 w-4" />
          </button>
          <button className="bg-gray-100 px-4 py-1 rounded-full text-sm">
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white p-3 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-primary-500" />
          <div>
            <h2 className="font-medium">{deliveryAddress.name}</h2>
            <p className="text-sm text-gray-500">{deliveryAddress.address}</p>
          </div>
        </div>
        <ChevronDown className="h-5 w-5" />
      </div>

      <div className="bg-green-50 p-3 text-green-800">
        <p className="text-sm">₹238 saved! on this order, including ₹26 with Swiggy One!</p>
      </div>

      <div className="bg-white p-3 mt-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">SAVE50</h3>
            <p className="text-sm text-gray-500">Offer applied on the bill</p>
          </div>
          <button className="text-red-500 font-medium">Remove</button>
        </div>
        <button className="w-full text-left text-primary-500 font-medium mt-3 flex items-center">
          View more coupons & offers <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4">
        <div className="bg-white p-3">
          <h3 className="text-lg mb-2">Review your Order</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            Your order will come in separate deliveries.
            <span className="text-primary-500">Why?</span>
          </p>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Delivery 1</h4>
                <span className="text-sm text-gray-500">4 items</span>
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm">
                <span className="bg-green-50 px-2 py-1 rounded">5 Mins</span>
                <span>Superfast</span>
              </div>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 border-t pt-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.size}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <button className="px-3 py-1 text-primary-500">-</button>
                        <span className="px-2">{item.quantity}</span>
                        <button className="px-3 py-1 text-primary-500">+</button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.price}</p>
                        <p className="text-xs text-gray-500 line-through">
                          ₹{item.originalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              <span className="font-medium">Apply Coupon</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-3 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">I don't need a bag!</h3>
              <p className="text-sm text-gray-500">
                Take the pledge for a greener future - opt for a no bag delivery!
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="bg-white p-3 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Say thanks with a tip</h3>
            <span className="text-gray-400">ⓘ</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            While you're celebrating with your loved ones, our delivery partners are working
            hard. Tip them and make their festive season special too!
          </p>
          <div className="flex gap-2">
            {[10, 20, 30].map((amount) => (
              <button
                key={amount}
                className={`flex-1 py-2 rounded-lg border ${
                  amount === 20
                    ? "bg-primary-500 text-white border-primary-500"
                    : "border-gray-300"
                }`}
              >
                ₹{amount}
              </button>
            ))}
            <button className="flex-1 py-2 rounded-lg border border-gray-300">
              Other
            </button>
          </div>
        </div>

        <div className="bg-white p-3 mt-4">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/placeholder.svg"
              alt="PhonePe"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium">Pay using</p>
              <p className="text-sm">PhonePe UPI</p>
            </div>
            <button className="text-primary-500">Change</button>
          </div>
          <button className="w-full bg-primary-500 text-white py-4 rounded-full font-medium">
            Slide to Pay | ₹386
          </button>
        </div>
      </div>
    </div>
  );
};