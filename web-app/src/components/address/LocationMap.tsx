import { GoogleMap, Marker } from "@react-google-maps/api";

interface LocationMapProps {
  center: google.maps.LatLngLiteral;
  onClick: (e: google.maps.MapMouseEvent) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export const LocationMap = ({ center, onClick }: LocationMapProps) => {
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      onClick={onClick}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};