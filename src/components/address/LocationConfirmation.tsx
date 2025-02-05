import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationConfirmationProps {
  address: string;
  area: string;
  onChangeClick: () => void;
  onConfirmClick: () => void;
}

export const LocationConfirmation = ({
  address,
  area,
  onChangeClick,
  onConfirmClick,
}: LocationConfirmationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg animate-slideUp">
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-1" />
          <div className="flex-1">
            <h2 className="font-medium">{address}</h2>
            <p className="text-sm text-gray-500">{area}</p>
          </div>
          <Button 
            variant="outline" 
            className="h-8 text-primary"
            onClick={onChangeClick}
          >
            CHANGE
          </Button>
        </div>

        <Button
          className="w-full"
          onClick={onConfirmClick}
        >
          Confirm Location
        </Button>
      </div>
    </div>
  );
};
