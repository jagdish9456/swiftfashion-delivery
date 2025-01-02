import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");
  const isDeliveryRoute = location.pathname.startsWith("/delivery");

  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  // Redirect delivery partners trying to access customer routes
  if (userRole === "delivery" && !isDeliveryRoute && location.pathname !== "/login") {
    return <Navigate to="/delivery" replace />;
  }

  // Redirect customers trying to access delivery routes
  if (userRole === "user" && isDeliveryRoute) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};