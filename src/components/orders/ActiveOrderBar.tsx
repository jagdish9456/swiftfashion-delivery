import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";

export const ActiveOrderBar = () => {
  // This would typically come from a context or state management
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
      className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="bg-primary-500 text-white rounded-lg p-3">
          <Package className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{orderDetails.status}</h3>
          <p className="text-sm text-gray-500">Arriving in {orderDetails.eta}</p>
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-gray-400" />
    </Link>
  );
};