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
        name: "Classic Black Suit",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
      },
      {
        id: "2",
        name: "White Business Shirt",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400",
      },
      {
        id: "3",
        name: "Navy Blue Blazer",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1594938374182-f8830c46b5e7?w=400",
      },
      {
        id: "4",
        name: "Formal Trousers",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
      },
    ],
  },
  {
    name: "Casual Wear",
    products: [
      {
        id: "5",
        name: "Denim Jacket",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
      },
      {
        id: "6",
        name: "Graphic T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
      },
      {
        id: "7",
        name: "Slim Fit Jeans",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
      },
      {
        id: "8",
        name: "Casual Sneakers",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
      },
    ],
  },
  {
    name: "Ethnic Wear",
    products: [
      {
        id: "9",
        name: "Traditional Kurta",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
      },
      {
        id: "10",
        name: "Silk Saree",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
      },
      {
        id: "11",
        name: "Embroidered Sherwani",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=400",
      },
      {
        id: "12",
        name: "Designer Lehenga",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400",
      },
    ],
  },
];

export const CategorySection = () => {
  return (
    <section className="py-4 space-y-8">
      {categories.map((category, index) => (
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