import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import users from "@/data/users.json";

export const ProfileDetails = () => {
  const navigate = useNavigate();
  const user = users.users[0]; // For now, we'll use the first user

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-2 border-b">
        <button onClick={() => navigate('/profile')} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Profile Details</h1>
      </div>

      <main className="p-4">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500 mb-1">Preferred Size</p>
              <p className="font-medium">{user.preferences.size}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Login</p>
              <p className="font-medium">{new Date(user.lastLogin).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};