import { Package2 } from "lucide-react";
import { Link } from "react-router-dom";

export const ActiveOrderBar = () => {
  return (
    <Link to="/track-order/123" className="block bg-white border-t border-b pb-2">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Package2 className="h-4 w-4 text-primary-500" />
          <div>
            <p className="text-xs font-medium">Order #123 is on the way</p>
            <p className="text-xs text-gray-500">Arriving in 15 mins</p>
          </div>
        </div>
        <span className="text-xs text-primary-500">Track &gt;</span>
      </div>
    </Link>
  );
};