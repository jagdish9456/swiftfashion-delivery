export const TransactionCard = () => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm p-4 rounded-xl border dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">5 batch deliveries</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Today, 1:23 pm • 18.7 mi</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-800 dark:text-white">+ $79.90</p>
          <p className="text-sm text-orange-500">+ $21.10 tips</p>
        </div>
      </div>
    </div>
  );
};
