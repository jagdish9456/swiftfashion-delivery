import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

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

export const SearchBar = ({ 
  search, 
  onSearchChange, 
  onSelect, 
  suggestions, 
  showSuggestions 
}: SearchBarProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const handleTranscript = (transcript: string) => {
    onSearchChange(transcript);
    setShowDropdown(true);
  };

  const { isListening, startListening } = useSpeechRecognition(handleTranscript);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative flex-1" ref={searchRef}>
      <SearchInput
        search={search}
        onSearchChange={(value) => {
          onSearchChange(value);
          setShowDropdown(true);
        }}
        onMicClick={startListening}
        onSearchClick={handleSearchClick}
        isListening={isListening}
      />
      {showDropdown && showSuggestions && (
        <SearchSuggestions
          categories={suggestions.categories}
          products={suggestions.products}
          onSelect={onSelect}
          search={search}
        />
      )}
    </div>
  );
};
