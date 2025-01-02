import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DeliveryChat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary p-6 relative">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-4">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-center mt-8 text-white">Support Chat</h1>
      </div>

      <div className="p-4 -mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm h-[calc(100vh-180px)]">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <div className="text-center text-gray-500 my-4">
                Chat with support will appear here
              </div>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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