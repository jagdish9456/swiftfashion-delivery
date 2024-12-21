import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { FooterText } from "@/components/layout/FooterText";
import { BottomNav } from "@/components/layout/BottomNav";
import { StoreSection } from "@/components/stores/StoreSection";

export const NearYou = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStoreClick = (storeId: string) => {
    navigate(`/category/${storeId}?store=true`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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
          <h1 className="text-base font-medium">Stores Near You</h1>
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
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
            alt="Featured Stores"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <StoreSection />
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
      <BottomNav />
    </div>
  );
};
