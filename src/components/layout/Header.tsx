import { Bell, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LocationButton } from "./LocationButton";
import { SearchBar } from "./SearchBar";

// Mock data for search suggestions
const searchSuggestions = {
  categories: [
    { id: "formal-wear", name: "Formal Wear" },
    { id: "casual-wear", name: "Casual Wear" },
    { id: "ethnic-wear", name: "Ethnic Wear" },
    { id: "sportswear", name: "Sportswear" },
  ],
  products: [
    { id: "1", name: "Classic White Shirt", category: "formal-wear" },
    { id: "2", name: "Blue Denim Jeans", category: "casual-wear" },
    { id: "3", name: "Traditional Saree", category: "ethnic-wear" },
    { id: "4", name: "Sports Track Suit", category: "sportswear" },
  ]
};

export const Header = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    address: "Set Locations",
    area: "Choose delivery area"
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    }
  }, []);

  const handleSelect = (type: 'category' | 'product', id: string) => {
    setSearch("");
    if (type === 'category') {
      navigate(`/category/${id}`);
    } else {
      navigate(`/product/${id}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="flex flex-col p-3 gap-2">
        <div className="flex items-center justify-between">
          <LocationButton address={location.address} area={location.area} />
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => navigate("/notifications")}
            >
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
        <SearchBar 
          search={search}
          onSearchChange={setSearch}
          onSelect={handleSelect}
          suggestions={searchSuggestions}
          showSuggestions={search.length >= 2}
        />
      </div>
    </header>
  );
};