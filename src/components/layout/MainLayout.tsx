import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[116px] pb-20 h-[calc(100vh-116px)] overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};