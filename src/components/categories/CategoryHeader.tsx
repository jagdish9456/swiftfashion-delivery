import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

type CategoryHeaderProps = {
  id?: string;
  onOpenFilter: () => void;
};

export const CategoryHeader = ({ id, onOpenFilter }: CategoryHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 flex items-center justify-between border-b">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={() => navigate('/')}
        >
          ←
        </Button>
        <h1 className="text-base font-semibold">
          {id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h1>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 hover:bg-primary-50 hover:text-primary-500"
        onClick={onOpenFilter}
      >
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};
