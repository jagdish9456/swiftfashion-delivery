import { Home, Wallet, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { StatusCard } from "@/components/delivery/StatusCard";
import { OrdersCard } from "@/components/delivery/OrdersCard";
import { TransactionCard } from "@/components/delivery/TransactionCard";
import { SearchOrder } from "./SearchOrder";

export const DeliveryIndex = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showSearchOrder, setShowSearchOrder] = useState(true);

  useEffect(() => {
    // Automatically close the popup after 30 seconds
    const timer = setTimeout(() => {
      setShowSearchOrder(false);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white relative">
      {showSearchOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <SearchOrder onClose={() => setShowSearchOrder(false)} />
        </div>
      )}
      {/* Header Section */}
      <div className="bg-orange-500 dark:bg-orange-600 p-6 rounded-b-[30px]">
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
      <div className="p-4">
        <StatusCard isOnline={isOnline} onStatusChange={setIsOnline} />
      </div>

     

      {/* Recent Transactions */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Transactions</h2>
        <div className="mb-4"><TransactionCard /></div>
        <div className="mb-4"><TransactionCard /></div>
        <div className="mb-4"><TransactionCard /></div>
        <div className="mb-4"><TransactionCard /></div>
        <div className="mb-4"><TransactionCard /></div>
        <div className="mb-4"><TransactionCard /></div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
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
