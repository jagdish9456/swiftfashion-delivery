import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ChristmasBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-2">
      <div 
        className="rounded-lg overflow-hidden relative group cursor-pointer"
        onClick={() => navigate("/category/christmas-sale")}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        <img
          src="https://images.unsplash.com/photo-1543589077-47d723c3d516?w=1200"
          alt="Christmas Special Offer"
          className="w-full h-24 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Christmas Sale</h2>
            <p className="text-white text-sm">Up to 60% off on selected items</p>
            <Button className="mt-2 bg-white/20 hover:bg-white/30 text-white text-xs">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};