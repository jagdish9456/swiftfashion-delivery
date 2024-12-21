import { Button } from "@/components/ui/button";

const deals = [
  {
    id: 1,
    title: "Winter Collection",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
  },
  {
    id: 2,
    title: "Formal Wear",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
  },
  {
    id: 3,
    title: "Summer Sale",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
  },
];

export const DealsSection = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Deals of the Day</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="relative rounded-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
              <h3 className="text-xl font-bold">{deal.title}</h3>
              <p className="text-2xl font-bold text-primary-100">{deal.discount}</p>
              <Button className="mt-2 bg-white/20 hover:bg-white/30 text-white">
                Shop Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};