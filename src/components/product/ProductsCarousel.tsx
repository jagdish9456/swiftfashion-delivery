import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
};

type ProductsCarouselProps = {
  products: Product[];
  title: string;
};

export const ProductsCarousel = ({ products, title }: ProductsCarouselProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">{title}</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((item) => (
            <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/3">
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="aspect-square">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h4 className="text-sm font-medium truncate">{item.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm font-semibold">${item.price}</span>
                    <span className="text-xs text-gray-500 line-through">
                      ${item.originalPrice}
                    </span>
                    <span className="text-xs text-green-600">{item.discount}</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};
