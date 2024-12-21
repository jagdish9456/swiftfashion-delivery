import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 12.9716,  // Default to Bangalore coordinates
  lng: 77.5946,
};

export const SetLocation = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState({
    address: "Akshya Nagar",
    area: "Raurthy Nagar, Bangalore-56001",
    coordinates: defaultCenter,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpykb5kDNhjGbS9iyxngUhiAknQId6lPo",
  });

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCpykb5kDNhjGbS9iyxngUhiAknQId6lPo`
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
    localStorage.setItem("userLocation", JSON.stringify({
      address: selectedLocation.address,
      area: selectedLocation.area,
    }));
    navigate(-1);
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
          <h1 className="text-base font-medium">Confirm delivery Location</h1>
        </div>
      </header>

      <div className="h-[calc(100vh-56px)] mt-[56px]">
        <div className="h-[70%] bg-gray-100 relative">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={selectedLocation.coordinates}
            onClick={handleMapClick}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker position={selectedLocation.coordinates} />
          </GoogleMap>
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
                onClick={() => setSelectedLocation({
                  address: "Akshya Nagar",
                  area: "Raurthy Nagar, Bangalore-56001",
                  coordinates: defaultCenter,
                })}
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
      </div>
    </div>
  );
};

export default SetLocation;