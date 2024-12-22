import { Mic, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const startListening = async () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onSearchChange(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to recognize speech. Please try again.",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Speech recognition is not supported in your browser.",
      });
    }
  };

  return (
    <div className="relative flex-1">
      <Input
        placeholder="Search Items"
        className="pl-3 pr-16 py-1 w-full bg-gray-50 h-9 text-sm"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="absolute right-0 top-0 h-full flex items-center gap-1 pr-2">
        <Button
          variant="ghost"
          size="icon"
          className={`h-7 w-7 ${isListening ? 'text-primary-500' : 'text-gray-500'}`}
          onClick={startListening}
        >
          <Mic className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
        >
          <Search className="h-3.5 w-3.5 text-gray-500" />
        </Button>
      </div>
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
    </div>
  );
};