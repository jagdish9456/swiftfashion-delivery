import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type Category = {
  name: string;
  products: Product[];
};

const categories: Category[] = [
  {
    name: "Formal Wear",
    products: [
      {
        id: "1",
        name: "Classic Suit",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      },
      {
        id: "2",
        name: "Business Shirt",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      },
      {
        id: "3",
        name: "Formal Trousers",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      },
      // Add more products as needed
    ],
  },
  {
    name: "Casual Wear",
    products: [
      {
        id: "4",
        name: "Denim Jacket",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      },
      {
        id: "5",
        name: "T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      },
      {
        id: "6",
        name: "Jeans",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      },
    ],
  },
  {
    name: "Ethnic Wear",
    products: [
      {
        id: "7",
        name: "Traditional Dress",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      },
      {
        id: "8",
        name: "Silk Saree",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      },
      {
        id: "9",
        name: "Kurta Set",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      },
    ],
  },
];

export const CategorySection = () => {
  return (
    <section className="py-4 space-y-8">
      {categories.map((category) => (
        <div key={category.name} className="space-y-4">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-lg font-semibold">{category.name}</h2>
            <button className="text-primary-500 text-sm">View All</button>
          </div>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {category.products.map((product) => (
                <CarouselItem key={product.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4">
                  <ProductCard {...product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ))}
    </section>
  );
};