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

  const recommendedProducts = [
    {
      id: "6",
      name: "Classic Fit White Cotton Shirt",
      price: 150,
      originalPrice: 499,
      delivery: "5 mins",
      quantity: "1 Piece",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=500",
    },
    {
      id: "7",
      name: "Slim Fit Black Formal Trousers",
      price: 155,
      originalPrice: 499,
      delivery: "5 mins",
      quantity: "1 Piece",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=500",
    },
    {
      id: "8",
      name: "Casual Denim Jacket",
      price: 109,
      originalPrice: 899,
      delivery: "5 mins",
      quantity: "1 pack",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=500",
    },
    {
      id: "9",
      name: "Cotton Blend Casual Sweater",
      price: 127,
      originalPrice: 249,
      delivery: "5 mins",
      quantity: "1 pack",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=500",
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
          <div className="mb-3">
            <p className="text-sm font-medium">SAVE50</p>
            <p className="text-xs text-gray-500">Offer applied on the bill</p>
          </div>
          <button className="text-sm text-red-500 font-medium">Remove</button>
        </div>
        <button className="w-full text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
          View more coupons & offers <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3 p-3 bg-white">
          <h2 className="text-sm font-medium">Review your Order</h2>
          <button className="text-xs text-orange-500">Why?</button>
        </div>

        <div className="space-y-4">
          <div className="bg-white px-3">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium my-2">Delivery 1</p>
              <div className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="font-medium">5 Mins</span>
                Superfast
              </div>
              <span className="text-xs text-gray-500 ml-auto">{cartItems.length} items</span>
            </div>

            <div className="space-y-3">
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
          </div>

          <div className="bg-white mt-4 py-4 px-3">
            <div className="flex items-center gap-2 mb-2 ">
              <p className="text-sm font-medium my-2">Delivery 2</p>
              <div className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="font-medium">8 Mins</span>
                Superfast
              </div>
              <span className="text-xs text-gray-500 ml-auto">{delivery2Items.length} item</span>
            </div>

            <div className="space-y-3">
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

        <button className="w-full text-orange-500 text-sm font-medium mt-4 flex items-center justify-center gap-1">
          Add more items
        </button>
      </div>

      <div className="bg-white p-3 mt-1">
        <h3 className="text-sm mb-3">Your last minute add-ons</h3>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <div className="flex-none w-32">
            <p className="text-sm font-medium text-pink-600">Did you forget?</p>
          </div>
          <div className="flex-none w-32">
            <p className="text-sm font-medium">Fresh fruits</p>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar mt-3">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="flex-none w-40 relative">
              <span className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded">
                10% OFF
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h4 className="text-sm line-clamp-2">{product.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <p className="text-xs">{product.quantity}</p>
                  <p className="text-xs text-gray-500 line-through">₹{product.originalPrice}</p>
                  <p className="text-sm font-medium">₹{product.price}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <span>{product.delivery}</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow-sm">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-3 mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">I don't need a bag!</p>
              <p className="text-xs text-gray-500">Take the pledge for a greener future - opt for a no bag delivery!</p>
            </div>
          </div>
          <Switch />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="p-3 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <img src="/placeholder.svg" alt="PhonePe" className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium">Pay using</p>
              <p className="text-xs">PhonePe UPI</p>
            </div>
          </div>
          <button className="text-orange-500 text-sm font-medium">Change</button>
        </div>
        
        <div className="p-3">
          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-full py-3"
            onClick={() => {}}
          >
            Pay | ₹386
          </Button>
        </div>
      </div>
    </div>
  );
};
