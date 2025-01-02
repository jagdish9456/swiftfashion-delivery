import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DeliveryWallet = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary p-6 relative">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-4">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-center mt-8 text-white">Wallet</h1>
      </div>

      <div className="p-4 -mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-4xl font-bold text-primary mt-2">₹ 1,234.56</p>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Today's Earnings</p>
                  <p className="text-sm text-gray-500">March 15, 2024</p>
                </div>
                <p className="text-lg font-bold text-primary">₹ 450.00</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Weekly Earnings</p>
                  <p className="text-sm text-gray-500">Mar 10 - Mar 16</p>
                </div>
                <p className="text-lg font-bold text-primary">₹ 2,345.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};