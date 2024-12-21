import { Search, SlidersHorizontal, Package2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-2 border-b">
        <button onClick={() => navigate('/profile')} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Orders</h1>
      </div>

      <main>
        <div className="p-4 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search in orders" className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            FILTER
          </Button>
        </div>

        <div className="space-y-4 p-4">
          <OrderItem 
            status="Exchange Delivered"
            date="On Fri, 20 Dec"
            brand="Blackberrys"
            name="Round Neck Pullover Cotton Sweatshirt"
            size="3XL"
            image="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400"
          />
          
          <OrderItem 
            status="Delivered"
            date="On Tue, 17 Dec"
            brand="Park Avenue"
            name="Men Slim fit Sweatshirt"
            size="XXL"
            image="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400"
          />
        </div>
      </main>
    </div>
  );
};

interface OrderItemProps {
  status: string;
  date: string;
  brand: string;
  name: string;
  size: string;
  image: string;
}

const OrderItem = ({ status, date, brand, name, size, image }: OrderItemProps) => {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Package2 className="h-6 w-6 text-primary-500" />
          <div>
            <div className="text-primary-500 font-medium">{status}</div>
            <div className="text-sm text-gray-500">{date}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <img src={image} alt={name} className="h-24 w-24 object-cover rounded" />
        <div className="flex-1">
          <h3 className="font-medium">{brand}</h3>
          <p className="text-sm text-gray-600">{name}</p>
          <p className="text-sm text-gray-500">Size: {size}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Button variant="outline" className="text-sm">Exchange</Button>
        <Button variant="outline" className="text-sm">Return</Button>
      </div>

      <div className="text-sm text-gray-500">
        Exchange/Return available till 27 Dec
      </div>
    </div>
  );
};