import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = Cookies.get("isAuthenticated") === "true";

  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};