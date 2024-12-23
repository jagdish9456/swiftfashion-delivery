import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface CategoryHeaderProps {
  id?: string;
  onOpenFilter: () => void;
  category?: {
    id: string;
    name: string;
    description: string;
    image: string;
    icon: string;
    gender: string;
    featured: boolean;
    order: number;
    metaTitle: string;
    metaDescription: string;
  };
}

export const CategoryHeader = ({ id, onOpenFilter, category }: CategoryHeaderProps) => {
  const navigate = useNavigate();
  const displayName = category?.name || id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

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
        <h1 className="text-base font-semibold">{displayName}</h1>
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