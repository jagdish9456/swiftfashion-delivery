import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { StoreSection } from "@/components/stores/StoreSection";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FilterSheet } from "@/components/filters/FilterSheet";

export const NearYou = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
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
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
              alt="Featured Stores"
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-2">Discover Local Fashion</h2>
                <p className="text-sm">Find the best stores near you</p>
              </div>
            </div>
          </div>
        </div>

        <StoreSection />
      </div>

      <FilterSheet
        open={showFilters}
        onOpenChange={setShowFilters}
        onApplyFilters={() => {
          setShowFilters(false);
        }}
      />
      <BottomNav />
    </div>
  );
};

export default NearYou;