import { StoreCard } from "./StoreCard";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const allStores = [
  {
    id: "1",
    name: "Ethnic Elegance",
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800",
    discount: 60,
    deliveryTime: "33 mins",
    type: "Ethnic Wear"
  },
  {
    id: "2",
    name: "Modern Trends",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
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
    name: "Kids Fashion Hub",
    image: "https://images.unsplash.com/photo-1560506840-ec148e82a604?w=800",
    discount: 25,
    deliveryTime: "23 mins",
    type: "Kids Wear"
  },
  {
    id: "5",
    name: "Designer Studio",
    image: "https://images.unsplash.com/photo-1589810635657-232948472d98?w=800",
    discount: 30,
    deliveryTime: "25 mins",
    type: "Designer Wear"
  },
  {
    id: "6",
    name: "Traditional Treasures",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800",
    discount: 15,
    deliveryTime: "35 mins",
    type: "Traditional Wear"
  },
  {
    id: "7",
    name: "Wedding Collection",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
    discount: 45,
    deliveryTime: "28 mins",
    type: "Wedding Wear"
  },
  {
    id: "8",
    name: "Fusion Fashion",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
    discount: 35,
    deliveryTime: "27 mins",
    type: "Indo-Western"
  }
];

export const StoreSection = () => {
  const navigate = useNavigate();
  const [visibleStores, setVisibleStores] = useState(allStores.slice(0, 8));
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const handleStoreClick = (storeId: string) => {
    navigate(`/category/${storeId}?store=true`);
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
          <div 
            key={store.id}
            onClick={() => handleStoreClick(store.id)}
            className="cursor-pointer"
          >
            <StoreCard {...store} />
          </div>
        ))}
        {visibleStores.length < allStores.length && (
          <div ref={ref} className="col-span-2 space-y-4">
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
