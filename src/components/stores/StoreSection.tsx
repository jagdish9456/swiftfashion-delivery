import { StoreCard } from "./StoreCard";

const stores = [
  {
    name: "Fresh Picks Mart",
    image: "/lovable-uploads/21826a43-4f43-4694-aa24-75b46dadb197.png",
    discount: 60,
    deliveryTime: "33 mins",
    type: "Grocery Store",
  },
  {
    name: "Market Marvel",
    image: "/lovable-uploads/5eaae198-2e42-463b-96fb-f24ea4bbb074.png",
    discount: 40,
    deliveryTime: "32 mins",
    type: "Supermarket",
  },
  {
    name: "Easy Eats",
    image: "/placeholder.svg",
    discount: 20,
    deliveryTime: "30 mins",
    type: "Restaurant",
  },
  {
    name: "Corner Shop",
    image: "/placeholder.svg",
    discount: 25,
    deliveryTime: "23 mins",
    type: "Convenience Store",
  },
];

export const StoreSection = () => {
  return (
    <section className="py-4">
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-lg font-semibold">Top stores for you</h2>
        <button className="text-primary-500 text-sm">View All</button>
      </div>
      <div className="flex overflow-x-auto gap-4 px-4 hide-scrollbar">
        {stores.map((store) => (
          <StoreCard key={store.name} {...store} />
        ))}
      </div>
    </section>
  );
};