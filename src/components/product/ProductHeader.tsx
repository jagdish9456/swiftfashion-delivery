import { ArrowLeft, Heart, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type ProductHeaderProps = {
  name: string;
};

export const ProductHeader = ({ name }: ProductHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 flex items-center justify-between border-b">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-base font-medium truncate max-w-[200px]">
          {name}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => navigate("/wishlist")}
        >
          <Heart className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => navigate("/cart")}
        >
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};