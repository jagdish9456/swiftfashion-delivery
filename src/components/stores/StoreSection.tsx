import { StoreCard } from "./StoreCard";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const allStores = [
  {
    id: "1",
    name: "Ethnic Elegance",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
    discount: 60,
    deliveryTime: "33 mins",
    type: "Ethnic Wear"
  },
  {
    id: "2",
    name: "Modern Fashion Hub",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800",
    discount: 40,
    deliveryTime: "32 mins",
    type: "Modern Fashion"
  },
  {
    id: "3",
    name: "Saree Paradise",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
    discount: 20,
    deliveryTime: "30 mins",
    type: "Saree Shop"
  },
  {
    id: "4",
    name: "Kids Fashion World",
    image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=800",
    discount: 25,
    deliveryTime: "23 mins",
    type: "Kids Wear"
  },
  {
    id: "5",
    name: "Men's Fashion Studio",
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800",
    discount: 30,
    deliveryTime: "25 mins",
    type: "Men's Fashion"
  },
  {
    id: "6",
    name: "Women's Boutique",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
    discount: 15,
    deliveryTime: "35 mins",
    type: "Women's Fashion"
  },
  {
    id: "7",
    name: "Designer Wear",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
    discount: 45,
    deliveryTime: "28 mins",
    type: "Designer Boutique"
  },
  {
    id: "8",
    name: "Traditional Attire",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800",
    discount: 35,
    deliveryTime: "27 mins",
    type: "Traditional Wear"
  }
];

export const StoreSection = () => {
  const navigate = useNavigate();
  const [visibleStores, setVisibleStores] = useState(allStores.slice(0, 8));
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const handleStoreClick = () => {
    navigate('/category/formal-wear');
  };

  if (inView && visibleStores.length < allStores.length) {
    setTimeout(() => {
      setVisibleStores(allStores.slice(0, visibleStores.length + 8));
    }, 1000);
  }

  return (
    <section className="py-4">
      <div className="grid grid-cols-2 gap-4 px-4">
        {visibleStores.map((store) => (
          <div key={store.name} onClick={handleStoreClick} className="cursor-pointer">
            <StoreCard {...store} />
          </div>
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
