import { StoreCard } from "./StoreCard";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const allStores = [
  {
    name: "Fresh Picks Mart",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    discount: 60,
    deliveryTime: "33 mins",
    type: "Grocery Store"
  },
  {
    name: "Market Marvel",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    discount: 40,
    deliveryTime: "32 mins",
    type: "Supermarket"
  },
  {
    name: "Easy Eats",
    image: "https://images.unsplash.com/photo-1546213290-e1b492ab3eee?w=800",
    discount: 20,
    deliveryTime: "30 mins",
    type: "Restaurant"
  },
  {
    name: "Corner Shop",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    discount: 25,
    deliveryTime: "23 mins",
    type: "Convenience Store"
  },
  {
    name: "Fashion Hub",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    discount: 30,
    deliveryTime: "25 mins",
    type: "Fashion Store"
  },
  {
    name: "Tech Zone",
    image: "https://images.unsplash.com/photo-1546213290-e1b492ab3eee?w=800",
    discount: 15,
    deliveryTime: "35 mins",
    type: "Electronics Store"
  },
  {
    name: "Beauty Boutique",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    discount: 45,
    deliveryTime: "28 mins",
    type: "Beauty Store"
  },
  {
    name: "Sports Central",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    discount: 35,
    deliveryTime: "27 mins",
    type: "Sports Store"
  },
  {
    name: "Home Essentials",
    image: "https://images.unsplash.com/photo-1546213290-e1b492ab3eee?w=800",
    discount: 50,
    deliveryTime: "31 mins",
    type: "Home Store"
  },
  {
    name: "Pet Paradise",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
    discount: 20,
    deliveryTime: "29 mins",
    type: "Pet Store"
  },
  {
    name: "Book Haven",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    discount: 25,
    deliveryTime: "26 mins",
    type: "Book Store"
  },
  {
    name: "Toy World",
    image: "https://images.unsplash.com/photo-1546213290-e1b492ab3eee?w=800",
    discount: 40,
    deliveryTime: "33 mins",
    type: "Toy Store"
  }
];

export const StoreSection = () => {
  const [visibleStores, setVisibleStores] = useState(allStores.slice(0, 8));
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  if (inView && visibleStores.length < allStores.length) {
    setTimeout(() => {
      setVisibleStores(allStores.slice(0, visibleStores.length + 8));
    }, 1000);
  }

  return (
    <section className="py-4">
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-base font-medium">Top stores for you</h2>
        <button className="text-primary-500 text-sm">View All</button>
      </div>
      <div className="grid grid-cols-2 gap-4 px-4">
        {visibleStores.map((store) => (
          <StoreCard key={store.name} {...store} />
        ))}
        {visibleStores.length < allStores.length && (
          <div ref={ref} className="col-span-2 flex justify-center py-4">
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-gray-200 rounded-lg w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};