import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProfileButtons } from "@/components/profile/ProfileButtons";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-500">+91 7289993664</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => navigate("/profile/details")}
          >
            View Profile Details
          </Button>
        </div>
        <ProfileButtons />
        <Button
          variant="destructive"
          className="w-full mt-4"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;