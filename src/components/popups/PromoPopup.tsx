import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

export const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPromo = Cookies.get("hasSeenPromo");
    if (!hasSeenPromo) {
      setIsOpen(true);
      Cookies.set("hasSeenPromo", "true", { expires: 1/720 }); // 2 minutes
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg mx-4 mb-4 overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl animate-slideUp">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 h-8 w-8 bg-white/20 hover:bg-white/30"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Special Offer!</h2>
          <p className="text-lg mb-4 text-gray-600">Get 30% off on new arrivals</p>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400" 
              alt="Fashion Collection" 
              className="mx-auto h-48 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary-50/20 to-transparent" />
          </div>
          <Button 
            className="w-full mt-4 bg-primary-500 hover:bg-primary-600 text-white"
            onClick={() => setIsOpen(false)}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};