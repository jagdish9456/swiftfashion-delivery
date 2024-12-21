import { useNavigate } from "react-router-dom";
import { Package2, Heart, Gift, Headphones, ChevronRight, ArrowLeft, Bell } from "lucide-react";

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-2 border-b">
        <button onClick={() => navigate('/')} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Profile</h1>
      </div>

      <main>
        <div className="p-4 bg-white mb-2 border-b">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-medium">jagdish sharma</h1>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4">
          <button 
            onClick={() => navigate('/orders')}
            className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border gap-1.5"
          >
            <Package2 className="h-5 w-5 text-primary-500" />
            <span className="text-sm">Orders</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border gap-1.5">
            <Heart className="h-5 w-5 text-primary-500" />
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

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Credit Options</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
              <div>
                <h3 className="font-medium">Pre-approved loan up to Rs.10,00,000</h3>
                <p className="text-sm text-gray-500">Interest rates from 10.99%</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
              <div>
                <h3 className="font-medium">Quickky Credit Card</h3>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
              <div>
                <h3 className="font-medium">Quickky EMI</h3>
                <p className="text-sm text-gray-500">Complete your application to avail now</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary-500" />
              <div>
                <h3 className="font-medium">Notification Settings</h3>
                <p className="text-sm text-gray-500">Manage your notification preferences</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </main>
    </div>
  );
};