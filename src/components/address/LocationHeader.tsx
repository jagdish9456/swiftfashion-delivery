import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationHeaderProps {
  title: string;
  onBackClick: () => void;
}

export const LocationHeader = ({ title, onBackClick }: LocationHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
      <div className="flex items-center p-3 gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onBackClick}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  );
};
