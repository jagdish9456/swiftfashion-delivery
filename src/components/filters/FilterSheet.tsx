import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

const storeTypes: FilterOption[] = [
  { id: "grocery", label: "Grocery Store", count: 33 },
  { id: "restaurant", label: "Restaurant", count: 29 },
  { id: "fashion", label: "Fashion Store", count: 28 },
  { id: "electronics", label: "Electronics Store", count: 31 },
  { id: "beauty", label: "Beauty Store", count: 30 },
];

const brands: FilterOption[] = [
  { id: "walmart", label: "Walmart" },
  { id: "target", label: "Target" },
  { id: "costco", label: "Costco" },
  { id: "wholeFoods", label: "Whole Foods" },
];

type FilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: () => void;
};

export const FilterSheet = ({ open, onOpenChange, onApplyFilters }: FilterSheetProps) => {
  const [selectedFilters, setSelectedFilters] = React.useState({
    storeTypes: [] as string[],
    brands: [] as string[],
  });
  const [distance, setDistance] = React.useState([5]);

  const handleFilterChange = (section: keyof typeof selectedFilters, id: string) => {
    setSelectedFilters((prev) => {
      const current = prev[section];
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      return { ...prev, [section]: updated };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      storeTypes: [],
      brands: [],
    });
    setDistance([5]);
  };

  const FilterSection = ({ 
    title, 
    options, 
    section 
  }: { 
    title: string; 
    options: FilterOption[]; 
    section: keyof typeof selectedFilters;
  }) => (
    <div className="py-4">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedFilters[section].includes(option.id)}
                onCheckedChange={() => handleFilterChange(section, option.id)}
                className="rounded-sm"
              />
              <span className="text-sm">{option.label}</span>
            </div>
            {option.count && (
              <span className="text-sm text-gray-500">{option.count}</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle>Filters</SheetTitle>
              <button
                onClick={clearAllFilters}
                className="text-primary-500 text-sm font-medium"
              >
                CLEAR ALL
              </button>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4">
            <div className="py-4">
              <h3 className="text-sm font-medium mb-4">Distance (km)</h3>
              <Slider
                value={distance}
                onValueChange={setDistance}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">0 km</span>
                <span className="text-sm text-gray-500">{distance[0]} km</span>
                <span className="text-sm text-gray-500">20 km</span>
              </div>
            </div>
            <FilterSection title="Store Type" options={storeTypes} section="storeTypes" />
            <FilterSection title="Brands" options={brands} section="brands" />
          </ScrollArea>

          <div className="border-t p-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button className="flex-1" onClick={onApplyFilters}>
              Apply
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};