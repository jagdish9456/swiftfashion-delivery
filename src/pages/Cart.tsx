import { ArrowLeft, Home, ChevronDown, ChevronRight, Plus, Minus, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Cart = () => {
  const navigate = useNavigate();
  const deliveryAddress = {
    name: "HOME",
    address: "d-2001 d block, mantri celestia, Mantri Celestia",
  };

  const cartItems = [
    {
      id: "1",
      name: "Classic Cotton Blend Navy Blue Polo T-shirt",
      quantity: 1,
      price: 80,
      originalPrice: 95,
      size: "L",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
    },
    {
      id: "2",
      name: "Premium Slim Fit Denim Jeans",
      quantity: 1,
      price: 60,
      originalPrice: 79,
      size: "32",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
    },
    {
      id: "3",
      name: "Casual Striped Oxford Shirt",
      quantity: 1,
      price: 128,
      originalPrice: 145,
      size: "M",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
    },
    {
      id: "4",
      name: "Comfort Fit Cotton Chinos",
      quantity: 1,
      price: 54,
      originalPrice: 65,
      size: "34",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
    },
  ];

  const delivery2Items = [
    {
      id: "5",
      name: "Lightweight Summer Linen Shirt",
      quantity: 1,
      price: 104,
      originalPrice: 229,
      size: "XL",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-48">
      <div className="bg-white p-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-base font-medium">Your Cart</h1>
        </div>
        <button className="text-sm text-red-500 font-medium">Clear</button>
      </div>

      <div className="bg-white p-3 flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-orange-500" />
          <div>
            <span className="text-sm font-medium">{deliveryAddress.name}</span>
            <p className="text-xs text-gray-500 mt-0.5">{deliveryAddress.address}</p>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>

      <div className="bg-emerald-50 p-3 mt-3">
        <p className="text-sm text-green-700">
          ₹238 saved! on this order
        </p>
      </div>

      <div className="bg-white p-3 mt-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">SAVE50</p>
            <p className="text-xs text-gray-500">Offer applied on the bill</p>
          </div>
          <button className="text-sm text-red-500 font-medium">Remove</button>
        </div>
        <button className="w-full text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
          View more coupons & offers <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 p-3 bg-white"> {/* Added more space here */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">Review your Order</h2>
          <button className="text-xs text-orange-500">Why?</button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium">Delivery 1</p>
              <div className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="font-medium">5 Mins</span>
                Superfast
              </div>
              <span className="text-xs text-gray-500 ml-auto">{cartItems.length} items</span>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button className="p-1">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm px-2">{item.quantity}</span>
                      <button className="p-1">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₹{item.price}</p>
                      <p className="text-xs text-gray-500 line-through">₹{item.originalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6"> {/* Added more space before Delivery 2 */}
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium">Delivery 2</p>
              <div className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="font-medium">8 Mins</span>
                Superfast
              </div>
              <span className="text-xs text-gray-500 ml-auto">{delivery2Items.length} item</span>
            </div>

            {delivery2Items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button className="p-1">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm px-2">{item.quantity}</span>
                      <button className="p-1">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₹{item.price}</p>
                      <p className="text-xs text-gray-500 line-through">₹{item.originalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
