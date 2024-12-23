import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

export const Orders = () => {
  return (
    <div className="min-h-screen pb-16">
      <Header />
      <div className="p-4">
        <h1>Orders</h1>
        {/* Add order list component here */}
      </div>
      <BottomNav />
    </div>
  );
};

export default Orders;