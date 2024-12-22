import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

export const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkPopupConditions = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const hasSeenPromo = Cookies.get("hasSeenPromo");
      console.log("Login status:", isLoggedIn);
      console.log("Has seen promo:", hasSeenPromo);
      
      if (isLoggedIn && !hasSeenPromo) {
        setIsOpen(true);
        // Set cookie to expire in 2 minutes for testing
        Cookies.set("hasSeenPromo", "true", { expires: 1/720 });
      }
    };

    // Small delay to ensure proper rendering after login
    const timer = setTimeout(checkPopupConditions, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4">
      <div className="relative w-full max-w-lg mx-auto overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl animate-slideUp">
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