import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SearchOrder = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);

  const handleAcceptOrder = () => {
    // Navigate to pickup screen with the order ID
    navigate('/delivery/pickup/567100248');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-2 border-b">
        <button onClick={() => navigate('/delivery')} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">New Order</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg overflow-hidden shadow">
          <div className="relative p-4 flex justify-center">
            <div className="w-48 h-48 rounded-full border-4 border-blue-500 flex items-center justify-center relative">
              <div className={`absolute w-full h-full ${isAnimating ? 'animate-ping' : ''} rounded-full bg-blue-100 opacity-30`}></div>
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                <img src="/placeholder.svg" alt="Map" className="w-24 h-24" />
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
              <h3 className="font-semibold">Burger Shop</h3>
              <p className="text-sm">Ground Floor, DT Mega Mall, DLF Phase 1, Gurugram</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                2 mins away
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 bg-red-50 hover:bg-red-100 border-red-200 text-red-600"
              onClick={() => navigate('/delivery')}
            >
              Deny
            </Button>
            <Button 
              className="flex-1 bg-green-500 hover:bg-green-600"
              onClick={handleAcceptOrder}
            >
              Accept order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
