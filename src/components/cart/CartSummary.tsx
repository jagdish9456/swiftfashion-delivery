interface CartSummaryProps {
  items: Array<{
    price: number;
    originalPrice: number;
  }>;
}

export const CartSummary = ({ items }: CartSummaryProps) => {
  const totalMRP = items.reduce((sum, item) => sum + item.originalPrice, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);
  const totalDiscount = totalMRP - totalAmount;

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">PRICE DETAILS ({items.length} Items)</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Total MRP</span>
          <span>₹{totalMRP}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Discount on MRP</span>
          <span>-₹{totalDiscount}</span>
        </div>
        <div className="flex justify-between border-t pt-3 font-medium">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};
