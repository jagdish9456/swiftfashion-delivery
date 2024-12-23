import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { CartFooter } from "@/components/cart/CartFooter";
import { CartSummary } from "@/components/cart/CartSummary";

const Cart = () => {
  const { items } = useCart();

  const cartItemsWithPricing = items.map(item => ({
    ...item,
    originalPrice: item.price * 1.2, // Example calculation, adjust as needed
    brand: "Default Brand",
    seller: "Default Seller",
    size: "One Size",
    discount: "20% OFF",
    returnDays: 7
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItemsWithPricing.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary items={cartItemsWithPricing} />
        </div>
      </div>
      <CartFooter items={cartItemsWithPricing} />
    </div>
  );
};

export default Cart;