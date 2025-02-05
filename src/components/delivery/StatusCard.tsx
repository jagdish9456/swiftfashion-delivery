import { Switch } from "@/components/ui/switch";

interface StatusCardProps {
  isOnline: boolean;
  onStatusChange: (value: boolean) => void;
}

export const StatusCard = ({ isOnline, onStatusChange }: StatusCardProps) => {
  return (
    <div className="p-4 bg-white shadow-sm rounded-xl border">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Status: {isOnline ? 'Online' : 'Offline'}</h2>
          <p className="text-gray-500 text-sm">Open to any delivery.</p>
        </div>
        <Switch checked={isOnline} onCheckedChange={onStatusChange} />
      </div>
    </div>
  );
};
