import { ArrowLeft, Navigation, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LocationMap } from "@/components/address/LocationMap";

export const PickupScreen = () => {
  const navigate = useNavigate();
  const center = { lat: 28.4595, lng: 77.0266 }; // DLF Phase 1, Gurugram coordinates

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    // Handle map click events if needed
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-2 border-b">
        <button onClick={() => navigate('/delivery')} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Reach pickup</h1>
      </div>

      <div className="relative h-[40vh]">
        <LocationMap center={center} onClick={handleMapClick} />
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Burger Shop</h2>
            <p className="text-gray-600">
              Ground Floor, DT Mega Mall, DLF Phase 1, Gurugram
            </p>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-blue-500 rounded-full" />
                <div className="text-sm text-gray-500">00:18</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex gap-2"
                onClick={() => window.open('tel:+1234567890')}
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button className="flex gap-2">
                <Navigation className="h-4 w-4" />
                Go to map
              </Button>
            </div>
          </div>

          <div className="border-t p-4 space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-sm">Order: 567100248</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-sm">Customer: Shreni Dand</span>
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-green-500 hover:bg-green-600 text-white h-14 rounded-full"
          onClick={() => {
            // Handle reached pickup location
          }}
        >
          Reached pickup location
        </Button>
      </div>
    </div>
  );
};