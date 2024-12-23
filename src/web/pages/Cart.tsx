import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/layout/BottomNav";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeItem } = useCart();
  const navigate = useNavigate();

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white p-4 border-b">
        <h1 className="text-lg font-medium">Shopping Cart</h1>
        <p className="text-sm text-gray-500">{cartItems.length} items</p>
      </div>

      <div className="p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button className="w-full bg-primary-500 text-white" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Cart;
