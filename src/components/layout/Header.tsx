import { Bell, MapPin, Mic, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    address: "Set Location",
    area: "Choose delivery area"
  });

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="flex flex-col p-3 gap-2">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="flex items-center gap-1.5 text-left py-1"
            onClick={() => navigate("/set-location")}
          >
            <MapPin className="h-3.5 w-3.5 text-primary-500" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">{location.address}</span>
              <span className="text-[10px] text-gray-500">{location.area}</span>
            </div>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => navigate("/profile")}
            >
              <UserRound className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search Items"
              className="pl-3 pr-8 py-1 w-full bg-gray-50 h-9 text-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Mic className="h-3.5 w-3.5 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};