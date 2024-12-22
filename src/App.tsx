import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import { Categories } from "@/pages/Categories";
import { CartProvider } from "@/contexts/CartContext";
import ProductDetails from "@/pages/ProductDetails";
import { GenderCategories } from "@/pages/GenderCategories";
import { SetLocation } from "@/pages/SetLocation";
import { Profile } from "@/pages/Profile";
import { Orders } from "@/pages/Orders";
import { Cart } from "@/pages/Cart";
import { NearYou } from "@/pages/NearYou";
import { Notifications } from "@/pages/Notifications";
import { AIChat } from "@/pages/AIChat";
import { FloatingAIButton } from "@/components/ai/FloatingAIButton";
import { Login } from "@/pages/Login";
import { Wishlist } from "@/pages/Wishlist";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const showFloatingButton = location.pathname !== "/login";

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/category/:id" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            <Route path="/gender-categories" element={<ProtectedRoute><GenderCategories /></ProtectedRoute>} />
            <Route path="/set-location" element={<ProtectedRoute><SetLocation /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/near-you" element={<ProtectedRoute><NearYou /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          </Routes>
          {showFloatingButton && <FloatingAIButton />}
          <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;