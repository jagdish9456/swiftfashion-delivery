import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <main className="pt-[116px]">{children}</main>
      <BottomNav />
    </div>
  );
};