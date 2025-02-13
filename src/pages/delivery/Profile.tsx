import { ArrowLeft, User, MapPin, Phone, Mail, LogOut, Award, Star, Clock } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white">
      <div className="bg-orange-500 dark:bg-orange-600 p-6 relative">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-4">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-center mt-8 text-white">Profile</h1>
      </div>

      <div className="p-4 -mt-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm dark:shadow-gray-800">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-primary-50 rounded-full mb-4 relative">
              <img
                src="https://sr-website.shiprocket.in/wp-content/uploads/2024/10/q-f-i-4.webp"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 p-1 rounded-full">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Alex Johnson</h2>
            <p className="text-gray-500">Partner ID: #123456</p>
            
            <div className="flex gap-4 mt-4">
              <div className="text-center">
                <div className="bg-primary-50 p-2 rounded-lg mb-1">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-orange-500">Level 4</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-50 p-2 rounded-lg mb-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-xs font-medium">4.8 Rating</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-50 p-2 rounded-lg mb-1">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-xs font-medium">2 Years</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-50 p-2 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">Alex Johnson</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-primary-50 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-800">+91 9900990099</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-primary-50 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">alex.j@example.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-primary-50 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Area</p>
                <p className="font-medium text-gray-800">Mumbai Central</p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
