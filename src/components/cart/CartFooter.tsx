interface CartFooterProps {
  items: Array<{
    price: number;
  }>;
}

export const CartFooter = ({ items }: CartFooterProps) => {
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <img src="/placeholder.svg" alt="Original" className="h-5" />
          <img src="/placeholder.svg" alt="Contactless" className="h-5" />
          <img src="/placeholder.svg" alt="Secure" className="h-5" />
        </div>
      </div>
      <button
        className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium"
        disabled={items.length === 0}
      >
        {items.length === 0 ? (
          "No Item selected, select at least one item to place order."
        ) : (
          `PLACE ORDER • ₹${totalAmount}`
        )}
      </button>
      <p className="text-xs text-center mt-3 text-gray-500">
        By placing the order, you agree to Quickky's{" "}
        <a href="#" className="text-primary-500">Terms of Use</a> and{" "}
        <a href="#" className="text-primary-500">Privacy Policy</a>
      </p>
    </div>
  );
};