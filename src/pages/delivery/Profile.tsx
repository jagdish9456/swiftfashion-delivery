import { ArrowLeft, User, MapPin, Phone, Mail, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const DeliveryProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      {/* Header */}
      <div className="bg-[#4CAF50] p-6 relative">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-4">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-center mt-8">Profile</h1>
      </div>

      {/* Profile Info */}
      <div className="p-4 -mt-6">
        <div className="bg-white dark:bg-[#221F26] rounded-xl p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-4">
              <img
                src="/placeholder.svg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-gray-500 dark:text-gray-400">Partner ID: #123456</p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center space-x-4">
              <User className="h-5 w-5 text-[#4CAF50]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                <p className="font-medium">Alex Johnson</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="h-5 w-5 text-[#4CAF50]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                <p className="font-medium">+91 9900990099</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-[#4CAF50]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium">alex.j@example.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-[#4CAF50]" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Service Area</p>
                <p className="font-medium">Mumbai Central</p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};