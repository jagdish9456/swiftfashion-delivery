import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { SavedAddressList } from "@/components/address/SavedAddressList";
import { LocationMap } from "@/components/address/LocationMap";
import { LocationHeader } from "@/components/address/LocationHeader";
import { LocationConfirmation } from "@/components/address/LocationConfirmation";

interface Address {
  address: string;
  area: string;
}

const defaultCenter = {
  lat: 12.9716,
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
      <LocationHeader
        title={showAddressList ? "Select Delivery Address" : "Confirm delivery Location"}
        onBackClick={() => navigate(-1)}
      />

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

            <LocationConfirmation
              address={selectedLocation.address}
              area={selectedLocation.area}
              onChangeClick={() => setShowAddressList(true)}
              onConfirmClick={handleConfirmLocation}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SetLocation;
