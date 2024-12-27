import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type LocationProps = {
  address: string;
  area: string;
};

export const LocationButton = ({ address, area }: LocationProps) => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="ghost" 
      className="flex items-center gap-1.5 text-left py-1"
      onClick={() => navigate("/set-location")}
    >
      <MapPin className="h-3.5 w-3.5 text-primary-500" />
      <div className="flex flex-col">
        <span className="text-xs font-medium">{address}</span>
        <span className="text-[10px] text-gray-500">{area}</span>
      </div>
    </Button>
  );
};