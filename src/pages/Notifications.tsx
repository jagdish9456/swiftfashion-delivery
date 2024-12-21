import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "82 SuperCoins credited in last 15 days!",
      message: "You have 444 supercoins. Use them to Shop, Play & Win",
      image: "https://cdn.pixabay.com/photo/2016/03/31/21/24/coin-1296332_1280.png",
      isNew: true,
      date: "5 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-500 text-white p-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Notifications (1)</h1>
      </div>

      <div className="flex gap-2 p-4 border-b bg-white">
        <button className="px-4 py-1.5 rounded-full bg-primary-500 text-white text-sm">
          All
        </button>
        <button className="px-4 py-1.5 rounded-full border text-gray-600 text-sm">
          Order Info
        </button>
      </div>

      <div className="p-4 space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-lg shadow-sm p-4">
            {notification.isNew && (
              <span className="text-red-500 text-sm font-medium">
                New · {notification.date}
              </span>
            )}
            <div className="flex gap-4 mt-2">
              <img 
                src={notification.image} 
                alt={notification.title}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};