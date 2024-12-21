import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (type: 'category' | 'product', id: string) => void;
  suggestions: {
    categories: Array<{ id: string; name: string }>;
    products: Array<{ id: string; name: string }>;
  };
  showSuggestions: boolean;
};

export const SearchBar = ({ search, onSearchChange, onSelect, suggestions, showSuggestions }: SearchBarProps) => {
  return (
    <div className="relative flex-1">
      <Input
        placeholder="Search Items"
        className="pl-3 pr-8 py-1 w-full bg-gray-50 h-9 text-sm"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-md shadow-lg border">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Categories">
                {suggestions.categories
                  .filter(cat => 
                    cat.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(category => (
                    <CommandItem
                      key={category.id}
                      onSelect={() => onSelect('category', category.id)}
                    >
                      {category.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandGroup heading="Products">
                {suggestions.products
                  .filter(prod => 
                    prod.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(product => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => onSelect('product', product.id)}
                    >
                      {product.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full"
      >
        <Mic className="h-3.5 w-3.5 text-gray-500" />
      </Button>
    </div>
  );
};