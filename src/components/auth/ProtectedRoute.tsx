import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");
  const isDeliveryRoute = location.pathname.startsWith("/delivery");
  const isShopRoute = location.pathname.startsWith("/shop");

  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  // Redirect delivery partners trying to access customer/shop routes
  if (userRole === "delivery" && !isDeliveryRoute && location.pathname !== "/login") {
    return <Navigate to="/delivery" replace />;
  }

  // Redirect shop partners trying to access customer/delivery routes
  if (userRole === "shop" && !isShopRoute && location.pathname !== "/login") {
    return <Navigate to="/shop" replace />;
  }

  // Redirect customers trying to access delivery/shop routes
  if (userRole === "user" && (isDeliveryRoute || isShopRoute)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};