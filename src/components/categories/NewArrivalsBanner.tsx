import { Button } from "@/components/ui/button";

type NewArrivalsBannerProps = {
  categoryId?: string;
};

export const NewArrivalsBanner = ({ categoryId }: NewArrivalsBannerProps) => {
  return (
    <div className="p-2 bg-[#F2FCE2]">
      <div className="rounded-lg p-3">
        <h3 className="text-base font-semibold text-primary-800 mb-1">New Arrivals</h3>
        <p className="text-sm text-primary-600 mb-2">
          Check out our latest collection in {categoryId?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </p>
        <Button 
          variant="secondary" 
          className="w-full sm:w-auto bg-white hover:bg-primary-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Explore Now
        </Button>
      </div>
    </div>
  );
};
