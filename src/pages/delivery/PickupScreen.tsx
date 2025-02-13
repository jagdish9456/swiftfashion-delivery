import { ArrowLeft, Navigation, Phone } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LocationMap } from "@/components/address/LocationMap";

export const PickupScreen = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const center = { lat: 28.4595, lng: 77.0266 }; // DLF Phase 1, Gurugram coordinates

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    // Handle map click events if needed
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white">
      <div className="bg-white dark:bg-gray-900 p-4 flex items-center gap-2 border-b dark:border-gray-700">
        <button onClick={() => navigate('/delivery')} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Reach pickup</h1>
      </div>

      <div className="relative h-[40vh]">
        <LocationMap center={center} onClick={handleMapClick} />
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-800">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Nike Outlet</h2>
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
                className="flex gap-2 text-orange-500"
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
              <span className="text-sm">Order: {orderId}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-sm">Customer: Shreni Dand</span>
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white h-14 rounded-full flex items-center justify-center gap-2"
          onClick={() => navigate(`/delivery/order-details/${orderId}`)}
        >
          <span className="text-2xl">»</span>
          <span>Reached pickup location</span>
        </Button>
      </div>
    </div>
  );
};
