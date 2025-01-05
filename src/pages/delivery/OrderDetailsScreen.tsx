import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const OrderDetailsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-2 border-b">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Pick order</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600">
            <span className="text-xl">🕒</span>
            <span className="font-medium">Pick order in 2 mins</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-gray-500">ORDER ID</p>
          <p className="text-3xl font-semibold">567100428</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <span className="text-xl">🛍️</span>
              <span className="font-medium">Order details</span>
            </div>
            <ArrowLeft className="h-5 w-5 rotate-[270deg]" />
          </div>
          <div className="p-4 space-y-3">
            <p className="text-gray-500">Burger Shop</p>
            <div className="space-y-2">
              <p>2 × Veg Burger</p>
              <p>1 × Chicken Burger</p>
              <p>1 × French Fries</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🏪</span>
            <span className="font-medium">Restaurant details</span>
          </div>
          <ArrowLeft className="h-5 w-5 rotate-[270deg]" />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">👤</span>
            <span className="font-medium">Customer details</span>
          </div>
          <ArrowLeft className="h-5 w-5 rotate-[270deg]" />
        </div>

        <Button 
          className="w-full bg-green-500 hover:bg-green-600 text-white h-14 rounded-full"
          onClick={() => navigate('/delivery/drop/567100428')}
        >
          <span className="mr-2">»</span>
          Picked order
        </Button>
      </div>
    </div>
  );
};