import { Switch } from "@/components/ui/switch";

interface StatusCardProps {
  isOnline: boolean;
  onStatusChange: (value: boolean) => void;
}

export const StatusCard = ({ isOnline, onStatusChange }: StatusCardProps) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 shadow-sm rounded-xl border dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Status: {isOnline ? 'Online' : 'Offline'}</h2>
          <p className="text-gray-500 text-sm dark:text-gray-400">Open to any delivery.</p>
        </div>
        <Switch checked={isOnline} onCheckedChange={onStatusChange} />
      </div>
    </div>
  );
};
