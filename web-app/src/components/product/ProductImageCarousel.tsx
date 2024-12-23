import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ProductImageCarouselProps = {
  images: string[];
  name: string;
};

export const ProductImageCarousel = ({ images, name }: ProductImageCarouselProps) => {
  return (
    <div className="pt-[48px]">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square w-full">
                <img
                  src={image}
                  alt={`${name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
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