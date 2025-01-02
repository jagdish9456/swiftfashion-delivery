import { Home, Wallet, MessageSquare, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const DeliveryIndex = () => {
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      {/* Header Section */}
      <div className="bg-[#4CAF50] p-6 rounded-b-[30px]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-[#388E3C] px-3 py-1 rounded-full text-sm">Level 4</span>
          </div>
          <h1 className="text-2xl font-bold">Partner Alex</h1>
          <div className="space-y-1">
            <p className="text-sm opacity-90">YOUR EARNINGS</p>
            <p className="text-4xl font-bold">$ 157.34</p>
          </div>
        </div>
        <img 
          src="/public/lovable-uploads/ffa76e9f-02dd-4288-aa1f-07d05ea54eca.png" 
          alt="Delivery Partner" 
          className="w-48 h-48 object-contain absolute top-4 right-4"
        />
      </div>

      {/* Status Section */}
      <div className="p-4 bg-white dark:bg-[#221F26] m-4 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Status: {isOnline ? 'Online' : 'Offline'}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Open to any delivery.</p>
          </div>
          <Switch 
            checked={isOnline} 
            onCheckedChange={setIsOnline}
            className="bg-gray-200 dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Orders Section */}
      <div className="p-4 bg-white dark:bg-[#221F26] m-4 rounded-xl">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-xl">
            <img src="/placeholder.svg" alt="Orders" className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">4 delivery orders found!</h3>
                <p className="text-[#4CAF50]">View details &gt;</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/20 px-3 py-1 rounded-full">
                <p className="text-red-600 dark:text-red-400 text-sm">Rush hour, be careful.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="bg-white dark:bg-[#221F26] p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">5 batch deliveries</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Today, 1:23 pm • 18.7 mi</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">+ $79.90</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">+ $21.10 tips</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#221F26] border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around items-center h-16">
          <Link to="/delivery" className="flex flex-col items-center text-[#4CAF50]">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/delivery/wallet" className="flex flex-col items-center text-gray-500">
            <Wallet className="h-6 w-6" />
            <span className="text-xs mt-1">Wallet</span>
          </Link>
          <Link to="/delivery/chat" className="flex flex-col items-center text-gray-500">
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Chat</span>
          </Link>
          <Link to="/delivery/profile" className="flex flex-col items-center text-gray-500">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};