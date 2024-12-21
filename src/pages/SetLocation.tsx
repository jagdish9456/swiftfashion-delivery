import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { SavedAddressList } from "@/components/address/SavedAddressList";
import { LocationMap } from "@/components/address/LocationMap";

interface Address {
  address: string;
  area: string;
}

const defaultCenter = {
  lat: 12.9716,  // Default to Bangalore coordinates
  lng: 77.5946,
};

export const SetLocation = () => {
  const navigate = useNavigate();
  const [showAddressList, setShowAddressList] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    address: "Akshya Nagar",
    area: "Raurthy Nagar, Bangalore-56001",
    coordinates: defaultCenter,
  });
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAU3N2Sk9jEEgaxJ7EpixGmI3N1Sh4j7Ss",
  });

  useEffect(() => {
    const addresses = localStorage.getItem("savedAddresses");
    if (addresses) {
      setSavedAddresses(JSON.parse(addresses));
    } else {
      const defaultAddresses = [
        {
          address: "Akshya Nagar",
          area: "Raurthy Nagar, Bangalore-56001",
        },
        {
          address: "JP Nagar",
          area: "Phase 6, Bangalore-56078",
        },
      ];
      localStorage.setItem("savedAddresses", JSON.stringify(defaultAddresses));
      setSavedAddresses(defaultAddresses);
    }
  }, []);

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAU3N2Sk9jEEgaxJ7EpixGmI3N1Sh4j7Ss`
        );
        const data = await response.json();
        
        if (data.results[0]) {
          const address = data.results[0].formatted_address;
          const addressComponents = address.split(',');
          
          setSelectedLocation({
            address: addressComponents[0],
            area: addressComponents.slice(1, 3).join(','),
            coordinates: { lat, lng },
          });
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  };

  const handleConfirmLocation = () => {
    const newAddress = {
      address: selectedLocation.address,
      area: selectedLocation.area,
    };
    
    const addressExists = savedAddresses.some(
      addr => addr.address === newAddress.address && addr.area === newAddress.area
    );
    
    if (!addressExists) {
      const updatedAddresses = [...savedAddresses, newAddress];
      localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
      setSavedAddresses(updatedAddresses);
    }

    localStorage.setItem("userLocation", JSON.stringify(newAddress));
    navigate(-1);
  };

  const handleSelectSavedAddress = (address: Address) => {
    setSelectedLocation({
      ...selectedLocation,
      address: address.address,
      area: address.area,
    });
    setShowAddressList(false);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

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
          <h1 className="text-base font-medium">
            {showAddressList ? "Select Delivery Address" : "Confirm delivery Location"}
          </h1>
        </div>
      </header>

      <div className="h-[calc(100vh-56px)] mt-[56px]">
        {showAddressList ? (
          <div className="p-4">
            <SavedAddressList
              addresses={savedAddresses}
              onSelectAddress={handleSelectSavedAddress}
              onAddNewClick={() => setShowAddressList(false)}
            />
          </div>
        ) : (
          <>
            <div className="h-[70%] bg-gray-100 relative">
              <LocationMap
                center={selectedLocation.coordinates}
                onClick={handleMapClick}
              />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg animate-slideUp">
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h2 className="font-medium">{selectedLocation.address}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedLocation.area}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="h-8 text-primary"
                    onClick={() => setShowAddressList(true)}
                  >
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
          </>
        )}
      </div>
    </div>
  );
};

export default SetLocation;