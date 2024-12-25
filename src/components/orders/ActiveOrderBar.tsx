import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";

export const ActiveOrderBar = () => {
  const hasActiveOrder = true;
  const orderDetails = {
    id: "194119238297300",
    items: 5,
    status: "Order getting picked up",
    eta: "8 mins"
  };

  if (!hasActiveOrder) return null;

  return (
    <Link
      to={`/track-order/${orderDetails.id}`}
      className="fixed bottom-14 left-0 right-0 bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-between shadow-sm"
    >
      <div className="flex items-center gap-2">
        <div className="bg-primary-500 text-white rounded-lg p-2">
          <Package className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">{orderDetails.status}</h3>
          <p className="text-xs text-gray-500">Arriving in {orderDetails.eta}</p>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-400" />
    </Link>
  );
};