import { MapPin, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Address {
  address: string;
  area: string;
}

interface SavedAddressListProps {
  addresses: Address[];
  onSelectAddress: (address: Address) => void;
  onAddNewClick: () => void;
}

export const SavedAddressList = ({
  addresses,
  onSelectAddress,
  onAddNewClick,
}: SavedAddressListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAddresses = addresses.filter(
    (addr) =>
      addr.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search saved addresses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />

      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={onAddNewClick}
      >
        <Plus className="h-4 w-4" />
        Add New Address
      </Button>

      <div className="space-y-2">
        {filteredAddresses.map((addr, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start gap-2 p-4 h-auto"
            onClick={() => onSelectAddress(addr)}
          >
            <MapPin className="h-4 w-4 shrink-0" />
            <div className="text-left">
              <div className="font-medium">{addr.address}</div>
              <div className="text-sm text-muted-foreground">{addr.area}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
