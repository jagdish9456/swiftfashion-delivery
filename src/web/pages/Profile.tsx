import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProfileButtons } from "@/components/profile/ProfileButtons";

export const Profile = () => {
  return (
    <div className="min-h-screen pb-16">
      <Header />
      <ProfileButtons />
      <BottomNav />
    </div>
  );
};

export default Profile;