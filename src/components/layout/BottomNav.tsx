import { Home, Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: ShoppingBag, label: "Cart", path: "/cart" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary-500"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};