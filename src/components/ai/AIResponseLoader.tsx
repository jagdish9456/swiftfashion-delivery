import { Shimmer } from "@/components/ui/shimmer";

export const AIResponseLoader = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="space-y-3">
          <Shimmer className="h-6 w-3/4" />
          <Shimmer className="h-4 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
            <Shimmer className="h-40 w-full mb-4" />
            <div className="space-y-2">
              <Shimmer className="h-4 w-3/4" />
              <Shimmer className="h-4 w-1/2" />
              <Shimmer className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
