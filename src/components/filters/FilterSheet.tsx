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
import { X } from "lucide-react";

type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

const sizes: FilterOption[] = [
  { id: "s", label: "S", count: 33 },
  { id: "m", label: "M", count: 29 },
  { id: "l", label: "L", count: 28 },
  { id: "xl", label: "XL", count: 31 },
  { id: "xxl", label: "XXL", count: 30 },
];

const colors: FilterOption[] = [
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "blue", label: "Blue" },
  { id: "red", label: "Red" },
];

const brands: FilterOption[] = [
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
  { id: "puma", label: "Puma" },
  { id: "reebok", label: "Reebok" },
];

const categories: FilterOption[] = [
  { id: "formal", label: "Formal Wear" },
  { id: "casual", label: "Casual Wear" },
  { id: "sports", label: "Sports Wear" },
];

type FilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: () => void;
};

export const FilterSheet = ({ open, onOpenChange, onApplyFilters }: FilterSheetProps) => {
  const [selectedFilters, setSelectedFilters] = React.useState({
    sizes: [] as string[],
    colors: [] as string[],
    brands: [] as string[],
    categories: [] as string[],
  });

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
      sizes: [],
      colors: [],
      brands: [],
      categories: [],
    });
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
            <FilterSection title="Size" options={sizes} section="sizes" />
            <FilterSection title="Color" options={colors} section="colors" />
            <FilterSection title="Brand" options={brands} section="brands" />
            <FilterSection
              title="Categories"
              options={categories}
              section="categories"
            />
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