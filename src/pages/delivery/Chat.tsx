import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DeliveryChat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white">
      <div className="bg-orange-500 dark:bg-orange-600 p-6 relative">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-4">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-center mt-8 text-white">Support Chat</h1>
      </div>

      <div className="p-4 -mt-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm h-[calc(100vh-180px)] dark:shadow-gray-800">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <div className="text-center text-orange-500 my-4">
                Chat with support will appear here
              </div>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border dark:bg-gray-800 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
