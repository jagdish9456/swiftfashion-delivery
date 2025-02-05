import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";
import { useState } from "react";

interface Address {
  address: string;
  area: string;
}

interface AddressListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addresses: Address[];
  onSelectAddress: (address: Address) => void;
  onAddNewClick: () => void;
}

export const AddressListDialog = ({
  open,
  onOpenChange,
  addresses,
  onSelectAddress,
  onAddNewClick,
}: AddressListDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAddresses = addresses.filter(
    (addr) =>
      addr.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Delivery Address</DialogTitle>
        </DialogHeader>
        
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

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
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
      </DialogContent>
    </Dialog>
  );
};
