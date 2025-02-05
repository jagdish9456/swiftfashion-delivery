import { useNavigate } from "react-router-dom";

export const OrdersCard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow-sm rounded-xl border">
      <div className="flex items-center space-x-4">
        <div className="bg-primary-50 p-3 rounded-xl">
          <img src="/placeholder.svg" alt="Orders" className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">4 delivery orders found!</h3>
              <button 
                onClick={() => navigate('/delivery/search-order')} 
                className="text-primary hover:underline"
              >
                View details >
              </button>
            </div>
            <div className="bg-orange-100 px-4 py-2 rounded-xl flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <p className="text-orange-700 text-sm font-medium">Rush hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
