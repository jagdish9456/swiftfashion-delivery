import { Home, Wallet, MessageSquare, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const DeliveryIndex = () => {
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-primary p-6 rounded-b-[30px]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-primary-600 px-3 py-1 rounded-full text-sm text-white">Level 4</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Partner Alex</h1>
          <div className="space-y-1">
            <p className="text-sm text-white/90">YOUR EARNINGS</p>
            <p className="text-4xl font-bold text-white">$ 157.34</p>
          </div>
        </div>
        <img 
          src="https://sr-website.shiprocket.in/wp-content/uploads/2024/10/q-f-i-4.webp" 
          alt="Delivery Partner" 
          className="w-48 h-48 object-contain absolute top-4 right-4"
        />
      </div>

      {/* Status Section */}
      <div className="p-4 bg-white shadow-sm m-4 rounded-xl border">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Status: {isOnline ? 'Online' : 'Offline'}</h2>
            <p className="text-gray-500 text-sm">Open to any delivery.</p>
          </div>
          <Switch 
            checked={isOnline} 
            onCheckedChange={setIsOnline}
          />
        </div>
      </div>

      {/* Orders Section */}
      <div className="p-4 bg-white shadow-sm m-4 rounded-xl border">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-50 p-3 rounded-xl">
            <img src="/placeholder.svg" alt="Orders" className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">4 delivery orders found!</h3>
                <p className="text-primary">View details &gt;</p>
              </div>
              <div className="bg-orange-100 px-4 py-2 rounded-xl flex items-center space-x-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                <p className="text-orange-700 text-sm font-medium">Rush hour</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Transactions</h2>
        <div className="bg-white shadow-sm p-4 rounded-xl border">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">5 batch deliveries</h3>
              <p className="text-sm text-gray-500">Today, 1:23 pm • 18.7 mi</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">+ $79.90</p>
              <p className="text-sm text-primary">+ $21.10 tips</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <Link to="/delivery" className="flex flex-col items-center text-primary">
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