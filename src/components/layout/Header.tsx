import { Bell, MapPin, Mic, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="flex flex-col p-4 gap-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="flex items-center gap-2 text-left">
            <MapPin className="h-4 w-4 text-primary-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Set Location</span>
              <span className="text-xs text-gray-500">Choose delivery area</span>
            </div>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <UserRound className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search Items"
              className="pl-4 pr-10 py-2 w-full bg-gray-50"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Mic className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};