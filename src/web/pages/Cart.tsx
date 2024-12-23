import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { CartFooter } from "@/components/cart/CartFooter";
import { CartSummary } from "@/components/cart/CartSummary";

const Cart = () => {
  const { items } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary items={items} />
        </div>
      </div>
      <CartFooter />
    </div>
  );
};

export default Cart;