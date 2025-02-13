import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SearchOrder = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);
  const [slidePosition, setSlidePosition] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0].clientX;
    const diff = ((touch - touchStart) / window.innerWidth) * 100;
    setSlidePosition(Math.max(0, Math.min(100, diff)));
  };

  const handleTouchEnd = () => {
    if (slidePosition > 75) {
      handleAcceptOrder();
    }
    setSlidePosition(0);
  };

  const handleAcceptOrder = () => {
    // Navigate to pickup screen with the order ID
    navigate('/delivery/pickup/567100248');
  };

  return (
    <div className="p-4 dark:bg-black dark:text-white">
      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow dark:shadow-gray-800">
        <div className="relative p-4 flex justify-center">
          <div className="w-48 h-48 rounded-full border-4 border-orange-500 flex items-center justify-center relative">
            <div className={`absolute w-full h-full ${isAnimating ? 'animate-ping' : ''} rounded-full bg-orange-100 dark:bg-orange-200 opacity-30`}></div>
            <div className="w-32 h-32 rounded-full bg-orange-100 dark:bg-orange-200 flex items-center justify-center">
              <img src="https://cdn.dribbble.com/users/3232028/screenshots/17250321/media/642c6f61b195e721ee4582d5b574e220.gif" alt="Delivery Animation" className="w-24 h-24 opacity-50" />
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Trip distance: 4.6 km</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border rounded-lg p-3">
            <div>
              <p className="text-sm text-gray-500">Pickup:</p>
              <p className="font-medium">0.2 kms</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Drop:</p>
              <p className="font-medium">4.4 kms</p>
            </div>
          </div>

          <div className="border rounded-lg p-3 space-y-2">
            <p className="text-sm text-gray-500">PICKUP FROM</p>
            <h3 className="font-semibold">Nike Outlet</h3>
            <p className="text-sm">Ground Floor, DT Mega Mall, DLF Phase 1, Gurugram</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              2 mins away
            </p>
          </div>
        </div>
        <div className="p-4 flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 bg-red-50 dark:bg-red-700 hover:bg-red-100 dark:hover:bg-red-600 border-red-200 text-red-600 dark:text-red-300"
            onClick={onClose}
          >
            Deny
          </Button>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-orange-500 dark:bg-orange-600 rounded-lg"></div>
            <div
              className="absolute inset-0 bg-orange-600 dark:bg-orange-700 rounded-lg transition-transform cursor-grab active:cursor-grabbing"
              style={{
                transform: `translateX(${slidePosition}%)`,
                touchAction: 'none'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="h-full flex items-center justify-center gap-2 text-white font-medium">
                <span>Slide to Accept</span>
                <ChevronRight className="w-5 h-5 animate-bounce" />
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};
