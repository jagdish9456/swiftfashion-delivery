import { Home, Grid, ShoppingBag, MapPin, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Shimmer } from "@/components/ui/shimmer";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Grid, label: "Categories", path: "/gender-categories" },
  { icon: ShoppingBag, label: "Cart", path: "/cart" },
  { icon: MapPin, label: "Near You", path: "/near-you" },
  { icon: MessageSquare, label: "Q-AI", path: "/ai-chat" },
];

export const BottomNav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (location.pathname === path) return;
    setIsLoading(true);
    // Reset loading state after navigation
    setTimeout(() => setIsLoading(false), 500);
  };

  if (isLoading) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100]">
        <div className="flex justify-around items-center h-16">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Shimmer className="h-5 w-5" />
              <Shimmer className="h-3 w-12" />
            </div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary-500 transition-colors"
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};