import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SetLocation = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState({
    address: "",
    area: "",
  });

  const handleConfirmLocation = () => {
    // Store location in localStorage
    localStorage.setItem("userLocation", JSON.stringify(selectedLocation));
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
        <div className="flex items-center p-3 gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-base font-medium">Confirm delivery Location</h1>
        </div>
      </header>

      <div className="h-[calc(100vh-56px)] mt-[56px]">
        <div className="h-[70%] bg-gray-100">
          {/* Map placeholder - will be replaced with actual Google Maps */}
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg animate-slideUp">
          <div className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div className="flex-1">
                <h2 className="font-medium">Akshya Nagar</h2>
                <p className="text-sm text-gray-500">
                  Raurthy Nagar, Bangalore-56001
                </p>
              </div>
              <Button variant="outline" className="h-8 text-primary">
                CHANGE
              </Button>
            </div>

            <Button
              className="w-full"
              onClick={handleConfirmLocation}
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetLocation;