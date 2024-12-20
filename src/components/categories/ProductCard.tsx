import { Button } from "@/components/ui/button";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
};

export const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-2 space-y-1">
        <h3 className="font-medium text-xs truncate">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-primary-500 font-semibold text-sm">
            ${price.toFixed(2)}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs hover:bg-primary-500 hover:text-white"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};