import { Package2, Heart, Gift, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProfileButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      <button 
        onClick={() => navigate('/orders')}
        className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border gap-1.5"
      >
        <Package2 className="h-5 w-5 text-primary-500" />
        <span className="text-sm">Orders</span>
      </button>
      <button 
        onClick={() => navigate('/wishlist')}
        className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border gap-1.5"
      >
        <Heart className="h-5 w-5 text-[#9b87f5]" />
        <span className="text-sm">Wishlist</span>
      </button>
      <button className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border gap-1.5">
        <Gift className="h-5 w-5 text-primary-500" />
        <span className="text-sm">Coupons</span>
      </button>
      <button className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border gap-1.5">
        <Headphones className="h-5 w-5 text-primary-500" />
        <span className="text-sm">Help Center</span>
      </button>
    </div>
  );
};