import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

export type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brand: string;
};

export const ProductCard = ({ id, name, price, image, description, brand }: ProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addItem({ id, name, price, image });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
      action: (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setIsAdding(false);
              toast({
                title: "Item removed",
                description: `${name} has been removed from your cart`,
              });
            }}
          >
            Undo
          </Button>
        </div>
      ),
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div 
      className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-2 space-y-1">
        <h3 className="font-medium text-xs truncate">{name}</h3>
        <p className="text-xs text-gray-500 truncate">{brand}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary-500 font-semibold text-sm">
            ${price.toFixed(2)}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs hover:bg-primary-500 hover:text-white"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Added" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};
