import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { FooterText } from "@/components/layout/FooterText";

const stores = [
  {
    id: "1",
    name: "Fashion Hub Store",
    image: "/lovable-uploads/21826a43-4f43-4694-aa24-75b46dadb197.png",
    rating: 4.5,
    distance: "1.2 km",
    type: "Fashion Store"
  },
  {
    id: "2",
    name: "Trendy Collections",
    image: "/lovable-uploads/5eaae198-2e42-463b-96fb-f24ea4bbb074.png",
    rating: 4.2,
    distance: "2.1 km",
    type: "Boutique"
  },
  {
    id: "3",
    name: "Style Studio",
    image: "/lovable-uploads/e9378036-26ff-4163-be71-29ae045c1c09.png",
    rating: 4.7,
    distance: "0.8 km",
    type: "Designer Store"
  },
  {
    id: "4",
    name: "Fashion Forward",
    image: "/lovable-uploads/55a80d4f-cc66-44c0-add1-267784bef2cf.png",
    rating: 4.3,
    distance: "1.5 km",
    type: "Clothing Store"
  }
];

export const NearYou = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStoreClick = (storeId: string) => {
    navigate(`/category/${storeId}?store=true`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Stores Near You</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-6">
          <img
            src="/lovable-uploads/21826a43-4f43-4694-aa24-75b46dadb197.png"
            alt="Featured Stores"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
              onClick={() => handleStoreClick(store.id)}
            >
              <div className="aspect-square relative">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1">{store.name}</h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{store.distance}</span>
                  <span>⭐ {store.rating}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{store.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FilterSheet
        open={showFilters}
        onOpenChange={setShowFilters}
        onApplyFilters={() => {
          setShowFilters(false);
          // Add filter logic here
        }}
      />
      <FooterText />
    </div>
  );
};