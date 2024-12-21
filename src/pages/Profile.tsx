import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Package2, Heart, Gift, Headphones, ChevronRight, CreditCard, FileText, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <main className="pt-[76px]">
        <div className="p-4 bg-white mb-2 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-medium">jagdish sharma</h1>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary-500 font-medium">Premium</span>
            <span>member</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <span>Supercoins Balance</span>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
              <img src="/coin-icon.png" alt="coin" className="h-4 w-4" />
              <span>570</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          <button 
            onClick={() => navigate('/orders')}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border gap-2"
          >
            <Package2 className="h-6 w-6 text-primary-500" />
            <span>Orders</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border gap-2">
            <Heart className="h-6 w-6 text-primary-500" />
            <span>Wishlist</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border gap-2">
            <Gift className="h-6 w-6 text-primary-500" />
            <span>Coupons</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border gap-2">
            <Headphones className="h-6 w-6 text-primary-500" />
            <span>Help Center</span>
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Credit Options</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Pre-approved loan up to Rs.10,00,000</h3>
                <p className="text-sm text-gray-500">Interest rates from 10.99%</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Flipkart Axis Bank Credit Card</h3>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Flipkart EMI</h3>
                <p className="text-sm text-gray-500">Complete your application to avail now</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Credit Score</h2>
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
            <div>
              <h3 className="font-medium">Free credit score check</h3>
              <p className="text-sm text-gray-500">Get detailed credit report instantly.</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary-500" />
              <span>Tap for latest updates and offers</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};