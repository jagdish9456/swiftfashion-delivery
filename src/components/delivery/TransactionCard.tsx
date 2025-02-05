export const TransactionCard = () => {
  return (
    <div className="bg-white shadow-sm p-4 rounded-xl border">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800">5 batch deliveries</h3>
          <p className="text-sm text-gray-500">Today, 1:23 pm • 18.7 mi</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-800">+ $79.90</p>
          <p className="text-sm text-primary">+ $21.10 tips</p>
        </div>
      </div>
    </div>
  );
};
