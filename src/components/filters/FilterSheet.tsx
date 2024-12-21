import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

type FilterSection = {
  id: string;
  title: string;
  options: FilterOption[];
};

const filterSections: FilterSection[] = [
  {
    id: "size",
    title: "Size",
    options: [
      { id: "s", label: "S", count: 33 },
      { id: "m", label: "M", count: 29 },
      { id: "l", label: "L", count: 28 },
      { id: "xl", label: "XL", count: 31 },
      { id: "xxl", label: "XXL", count: 30 },
    ],
  },
  {
    id: "color",
    title: "Color",
    options: [
      { id: "black", label: "Black" },
      { id: "white", label: "White" },
      { id: "blue", label: "Blue" },
    ],
  },
  {
    id: "brand",
    title: "Brand",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
    ],
  },
  {
    id: "categories",
    title: "Categories",
    options: [
      { id: "formal", label: "Formal" },
      { id: "casual", label: "Casual" },
      { id: "sports", label: "Sports" },
    ],
  },
  {
    id: "country",
    title: "Country of Origin",
    options: [
      { id: "in", label: "India" },
      { id: "us", label: "United States" },
      { id: "uk", label: "United Kingdom" },
    ],
  },
  {
    id: "price",
    title: "Price Range",
    options: [
      { id: "0-1000", label: "Under ₹1,000" },
      { id: "1000-5000", label: "₹1,000 - ₹5,000" },
      { id: "5000+", label: "Above ₹5,000" },
    ],
  },
  {
    id: "discount",
    title: "Discount",
    options: [
      { id: "10+", label: "10% and above" },
      { id: "20+", label: "20% and above" },
      { id: "30+", label: "30% and above" },
    ],
  },
  {
    id: "rating",
    title: "Rating",
    options: [
      { id: "4+", label: "4★ & above" },
      { id: "3+", label: "3★ & above" },
      { id: "2+", label: "2★ & above" },
    ],
  },
  {
    id: "delivery",
    title: "Delivery Time",
    options: [
      { id: "24h", label: "24 Hours" },
      { id: "3d", label: "3 Days" },
      { id: "7d", label: "7 Days" },
    ],
  },
];

type FilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFilters: Record<string, string[]>;
  onApplyFilters: (filters: Record<string, string[]>) => void;
};

export const FilterSheet = ({
  open,
  onOpenChange,
  selectedFilters,
  onApplyFilters,
}: FilterSheetProps) => {
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>(
    () => ({ ...selectedFilters })
  );

  const handleToggleFilter = (sectionId: string, optionId: string) => {
    setTempFilters((prev) => {
      const current = prev[sectionId] || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [sectionId]: updated };
    });
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onOpenChange(false);
  };

  const handleClearAll = () => {
    setTempFilters({});
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-md p-0">
        <SheetHeader className="px-4 py-2 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={handleClearAll}
            >
              CLEAR ALL
            </Button>
          </div>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4 py-4">
            {filterSections.map((section) => (
              <div key={section.id}>
                <div className="px-4 mb-2">
                  <h3 className="text-sm font-medium">{section.title}</h3>
                </div>
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between px-4 py-1"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${section.id}-${option.id}`}
                          checked={(tempFilters[section.id] || []).includes(
                            option.id
                          )}
                          onCheckedChange={() =>
                            handleToggleFilter(section.id, option.id)
                          }
                        />
                        <label
                          htmlFor={`${section.id}-${option.id}`}
                          className="text-sm"
                        >
                          {option.label}
                        </label>
                      </div>
                      {option.count !== undefined && (
                        <span className="text-sm text-muted-foreground">
                          {option.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t sticky bottom-0 bg-background">
          <Button onClick={handleApply} className="w-full">
            APPLY
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};