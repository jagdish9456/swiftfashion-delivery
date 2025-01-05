import { ArrowLeft, ChevronDown, ChevronUp, ShoppingBag, Store, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export const OrderDetailsScreen = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(true);
  const [isRestaurantDetailsOpen, setIsRestaurantDetailsOpen] = useState(false);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-2 border-b">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Pick order</h1>
      </div>

      <div className="p-4 bg-blue-50">
        <div className="flex items-center gap-2 text-blue-600">
          <span className="text-sm">Pick order in 2 mins</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="text-center">
          <p className="text-gray-500 text-sm">ORDER ID</p>
          <p className="text-2xl font-semibold">{orderId}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <button 
            className="w-full p-4 flex items-center justify-between"
            onClick={() => setIsOrderDetailsOpen(!isOrderDetailsOpen)}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-gray-500" />
              <div className="text-left">
                <h3 className="font-medium">Order details</h3>
                <p className="text-sm text-gray-500">Burger Shop</p>
              </div>
            </div>
            {isOrderDetailsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {isOrderDetailsOpen && (
            <div className="p-4 border-t space-y-3">
              <div className="flex justify-between">
                <span>2 x Veg Burger</span>
              </div>
              <div className="flex justify-between">
                <span>1 x Chicken Burger</span>
              </div>
              <div className="flex justify-between">
                <span>1 x French Fries</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <button 
            className="w-full p-4 flex items-center justify-between"
            onClick={() => setIsRestaurantDetailsOpen(!isRestaurantDetailsOpen)}
          >
            <div className="flex items-center gap-3">
              <Store className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Restaurant details</span>
            </div>
            {isRestaurantDetailsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <button 
            className="w-full p-4 flex items-center justify-between"
            onClick={() => setIsCustomerDetailsOpen(!isCustomerDetailsOpen)}
          >
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Customer details</span>
            </div>
            {isCustomerDetailsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>

        <button 
          className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-full flex items-center justify-center gap-2"
          onClick={() => navigate(`/delivery/drop-location/${orderId}`)}
        >
          <span className="text-2xl">»</span>
          <span>Picked order</span>
        </button>
      </div>
    </div>
  );
};