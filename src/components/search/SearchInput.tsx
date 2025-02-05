import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Search } from "lucide-react";

type SearchInputProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onMicClick: () => void;
  onSearchClick: () => void;
  isListening: boolean;
};

export const SearchInput = ({ 
  search, 
  onSearchChange, 
  onMicClick, 
  onSearchClick,
  isListening 
}: SearchInputProps) => {
  return (
    <>
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
          onClick={onMicClick}
        >
          <Mic className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onSearchClick}
          disabled={!search.trim()}
        >
          <Search className="h-3.5 w-3.5 text-gray-500" />
        </Button>
      </div>
    </>
  );
};
