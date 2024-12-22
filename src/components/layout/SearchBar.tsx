import { Mic, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startListening = async () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        // Set timeout to stop after 30 seconds
        timeoutRef.current = setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.stop();
          }
        }, 30000);
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onSearchChange(transcript);
        setShowDropdown(true);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to recognize speech. Please try again.",
        });
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Speech recognition is not supported in your browser.",
      });
    }
  };

  const handleSearchClick = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  return (
    <div className="relative flex-1" ref={searchRef}>
      <Input
        placeholder="Search Items"
        className="pl-3 pr-16 py-1 w-full bg-gray-50 h-9 text-sm"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={handleInputFocus}
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
          onClick={handleSearchClick}
        >
          <Search className="h-3.5 w-3.5 text-gray-500" />
        </Button>
      </div>
      {showDropdown && showSuggestions && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-md shadow-lg border">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {suggestions.categories.length > 0 && (
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
              )}
              {suggestions.products.length > 0 && (
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
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};