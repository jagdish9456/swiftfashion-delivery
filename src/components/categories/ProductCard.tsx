import { Button } from "@/components/ui/button";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
};

export const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 space-y-2">
        <h3 className="font-medium text-sm truncate">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-primary-500 font-semibold">
            ${price.toFixed(2)}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs hover:bg-primary-500 hover:text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};