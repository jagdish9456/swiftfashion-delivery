import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface LocationMapProps {
  center: google.maps.LatLngLiteral;
  onClick: (e: google.maps.MapMouseEvent) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Use an environment variable for the API key. Ensure REACT_APP_GOOGLE_MAPS_API_KEY is defined in your environment.
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyAU3N2Sk9jEEgaxJ7EpixGmI3N1Sh4j7Ss";

export const LocationMap = ({ center, onClick }: LocationMapProps) => {
  return (
    <LoadScript 
      googleMapsApiKey={GOOGLE_MAPS_API_KEY} 
      loadingElement={<div style={{ height: "100%" }} />}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        onClick={onClick}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};
