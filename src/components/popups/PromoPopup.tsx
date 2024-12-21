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
      <div className="relative w-full max-w-lg mx-4 mb-4 overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-100 rounded-2xl animate-slideUp">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 h-8 w-8 bg-white/20 hover:bg-white/30"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Get free delivery</h2>
          <p className="text-lg mb-4 text-gray-600">on your order above ₹199</p>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400" 
              alt="Quick Delivery" 
              className="mx-auto h-48 object-contain rounded-lg"
            />
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="https://cdn.pixabay.com/photo/2016/10/06/19/59/doodle-1719819_1280.png" 
                alt="doodles" 
                className="w-full h-full object-contain opacity-10"
              />
            </div>
          </div>
          <Button 
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setIsOpen(false)}
          >
            Got it, thanks!
          </Button>
        </div>
      </div>
    </div>
  );
};