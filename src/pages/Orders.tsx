import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Search, SlidersHorizontal, Package2, ArrowLeftRight, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Orders = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <main className="pt-[76px]">
        <div className="p-4 flex items-center justify-between bg-white border-b">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ArrowLeftRight className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">ORDERS</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">₹0</span>
            <img src="/coin-icon.png" alt="coin" className="h-6 w-6" />
          </div>
        </div>

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

        <div className="bg-black text-white p-4 rounded-lg mx-4 mb-4 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold">Extra 10% off on</p>
              <p className="text-lg font-bold">fwd styles in just ₹9/-</p>
            </div>
            <img src="/find-pass.png" alt="Find Pass" className="h-12" />
          </div>
          <div className="absolute bottom-2 right-2 flex gap-2">
            <div className="h-2 w-2 bg-white rounded-full opacity-50"></div>
            <div className="h-2 w-2 bg-white rounded-full"></div>
            <div className="h-2 w-2 bg-white rounded-full opacity-50"></div>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <OrderItem 
            status="Exchange Delivered"
            date="On Fri, 20 Dec"
            brand="Blackberrys"
            name="Round Neck Pullover Cotton Sweatshirt"
            size="3XL"
            image="/product-1.jpg"
            supercoins={30}
            boughtFor={["Jagdish", "Ashu"]}
          />
          
          <OrderItem 
            status="Delivered"
            date="On Tue, 17 Dec"
            brand="Park Avenue"
            name="Men Slim fit Sweatshirt"
            size="XXL"
            image="/product-2.jpg"
            supercoins={16}
            boughtFor={["Jagdish"]}
          />
        </div>
      </main>
      <BottomNav />
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
  supercoins: number;
  boughtFor: string[];
}

const OrderItem = ({ status, date, brand, name, size, image, supercoins, boughtFor }: OrderItemProps) => {
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
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Button variant="outline" className="text-sm">
          Style Exchange
          <span className="bg-pink-500 text-white text-xs px-1 rounded ml-1">NEW</span>
        </Button>
        <Button variant="outline" className="text-sm">Size Exchange</Button>
        <Button variant="outline" className="text-sm">Return</Button>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Exchange/Return available till 27 Dec
      </div>

      <div className="flex items-center gap-1 mb-2">
        {"★★★★★".split("").map((star, i) => (
          <span key={i} className="text-gray-300 text-xl">
            {star}
          </span>
        ))}
      </div>

      <div className="text-sm mb-4">
        Rate & Review to <span className="font-medium">earn Myntra Credit</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src="/coin-icon.png" alt="coin" className="h-5 w-5" />
          <span className="font-medium">{supercoins}</span>
          <span className="text-sm">SuperCoins earned</span>
          <Button variant="ghost" size="sm" className="p-0">
            <img src="/info-icon.png" alt="info" className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" className="text-pink-500 hover:text-pink-600">
          Collect Now
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Bought this for</span>
        <div className="flex items-center gap-2">
          {boughtFor.map((person, index) => (
            <span key={index} className="px-3 py-1 rounded-full bg-gray-100 text-sm">
              {person}
            </span>
          ))}
          <Button variant="outline" size="sm" className="rounded-full">
            Add Profile
          </Button>
        </div>
      </div>
    </div>
  );
};