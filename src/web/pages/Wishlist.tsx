// Copy the existing Wishlist component content
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/layout/BottomNav";

const categories = ["All", "Kurta Sets", "Tshirts", "Shirts", "Sweaters", "Jeans"];

const wishlistItems = [
  {
    id: 1,
    name: "Sera",
    price: 643,
    originalPrice: 1894,
    discount: "66% OFF",
    rating: 4.1,
    reviews: 305,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
  },
  {
    id: 2,
    name: "CHIC BY TOKYO TALKIES",
    price: 483,
    originalPrice: 1099,
    discount: "56% OFF",
    rating: 4.1,
    reviews: 5900,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
];

export const Wishlist = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white p-4 flex items-center gap-2 border-b sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-medium">Wishlist</h1>
          <p className="text-sm text-gray-500">{wishlistItems.length} items</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={`whitespace-nowrap ${
                category === "All" ? "bg-[#9b87f5] hover:bg-[#7E69AB]" : ""
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden border">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-[3/4] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3";
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
                >
                  <ArrowLeft className="h-4 w-4 rotate-45" />
                </Button>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">₹{item.price}</span>
                  <span className="text-xs text-gray-500 line-through">
                    ₹{item.originalPrice}
                  </span>
                  <span className="text-xs text-green-600">{item.discount}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded">
                    <span className="text-xs font-medium text-green-700">
                      {item.rating}
                    </span>
                    <span className="text-xs">★</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {item.reviews.toLocaleString()} Reviews
                  </span>
                </div>
                <Button className="w-full mt-3 bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
                  MOVE TO BAG
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
