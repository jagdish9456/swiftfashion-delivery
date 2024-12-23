import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Index } from "@/web/pages/Index";
import { Categories } from "@/web/pages/Categories";
import { CartProvider } from "@/contexts/CartContext";
import ProductDetails from "@/web/pages/ProductDetails";
import { GenderCategories } from "@/web/pages/GenderCategories";
import { SetLocation } from "@/web/pages/SetLocation";
import { Profile } from "@/web/pages/Profile";
import { ProfileDetails } from "@/web/pages/ProfileDetails";
import { Orders } from "@/web/pages/Orders";
import Cart from "@/web/pages/Cart";
import { NearYou } from "@/web/pages/NearYou";
import { Notifications } from "@/web/pages/Notifications";
import AIChat from "@/web/pages/AIChat";
import { FloatingAIButton } from "@/components/ai/FloatingAIButton";
import { Login } from "@/web/pages/Login";
import { Wishlist } from "@/web/pages/Wishlist";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useLocation } from "react-router-dom";
import { SearchResults } from "@/web/pages/SearchResults";
import { PromoPopup } from "@/components/popups/PromoPopup";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const showFloatingButton = !['login', 'set-location'].includes(location.pathname.split('/')[1]);

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
            <Route path="/profile/details" element={<ProtectedRoute><ProfileDetails /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/near-you" element={<ProtectedRoute><NearYou /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
          </Routes>
          {showFloatingButton && <FloatingAIButton />}
          <PromoPopup />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;