import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { StoreSection } from "@/components/stores/StoreSection";

export const NearYou = () => {
  return (
    <div className="min-h-screen pb-16">
      <Header />
      <StoreSection />
      <BottomNav />
    </div>
  );
};

export default NearYou;