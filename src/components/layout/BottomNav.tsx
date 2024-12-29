import { Home, Grid, ShoppingBag, MapPin, MessageSquare } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShimmerLoader } from "@/components/ui/shimmer";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Grid, label: "Categories", path: "/gender-categories" },
  { icon: ShoppingBag, label: "Cart", path: "/cart" },
  { icon: MapPin, label: "Near You", path: "/near-you" },
  { icon: MessageSquare, label: "Q-AI", path: "/ai-chat" },
];

export const BottomNav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleNavigation = (path: string) => {
    if (location.pathname === path) return;
    
    setIsLoading(true);
    navigate(path);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100] animate-in fade-in">
        <div className="flex justify-around items-center h-16">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <ShimmerLoader className="h-5 w-5 rounded" />
              <ShimmerLoader className="h-3 w-12 rounded" />
            </div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100] animate-in slide-in-from-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavigation(item.path)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ease-in-out ${
              activeTab === item.path
                ? "text-primary-500 scale-105"
                : "text-gray-500 hover:text-primary-500"
            }`}
          >
            <item.icon className={`h-5 w-5 transition-transform duration-300 ${
              activeTab === item.path ? "scale-110" : ""
            }`} />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};