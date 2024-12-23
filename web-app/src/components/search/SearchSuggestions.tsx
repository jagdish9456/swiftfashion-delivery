import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

type Suggestion = {
  id: string;
  name: string;
};

type SearchSuggestionsProps = {
  categories: Suggestion[];
  products: Suggestion[];
  onSelect: (type: 'category' | 'product', id: string) => void;
  search: string;
};

export const SearchSuggestions = ({ categories, products, onSelect, search }: SearchSuggestionsProps) => {
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProducts = products.filter(prod => 
    prod.name.toLowerCase().includes(search.toLowerCase())
  );

  const hasResults = filteredCategories.length > 0 || filteredProducts.length > 0;

  return (
    <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-md shadow-lg border">
      <Command>
        <CommandList>
          {!hasResults && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {filteredCategories.length > 0 && (
            <CommandGroup heading="Categories">
              {filteredCategories.map(category => (
                <CommandItem
                  key={category.id}
                  onSelect={() => onSelect('category', category.id)}
                >
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {filteredProducts.length > 0 && (
            <CommandGroup heading="Products">
              {filteredProducts.map(product => (
                <CommandItem
                  key={product.id}
                  onSelect={() => onSelect('product', product.id)}
                >
                  {product.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
};