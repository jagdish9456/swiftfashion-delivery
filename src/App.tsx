import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/contexts/CartContext";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { SmoothScrollProvider } from "@/components/utils/SmoothScrollProvider";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import { Categories } from "@/pages/Categories";
import ProductDetails from "@/pages/ProductDetails";
import { GenderCategories } from "@/pages/GenderCategories";
import { SetLocation } from "@/pages/SetLocation";
import { Profile } from "@/pages/Profile";
import { ProfileDetails } from "@/pages/ProfileDetails";
import { Orders } from "@/pages/Orders";
import { Cart } from "@/pages/Cart";
import { NearYou } from "@/pages/NearYou";
import { Notifications } from "@/pages/Notifications";
import { AIChat } from "@/pages/AIChat";
import { AIVoiceAgent } from "@/pages/AIVoiceAgent";
import { FloatingAIButton } from "@/components/ai/FloatingAIButton";
import { Login } from "@/pages/Login";
import { Wishlist } from "@/pages/Wishlist";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SearchResults } from "@/pages/SearchResults";
import { PromoPopup } from "@/components/popups/PromoPopup";
import { TrackOrder } from "@/pages/TrackOrder";
import { useCapacitorBackButton } from "@/hooks/useCapacitorBackButton";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      meta: {
        onError: (error: Error) => {
          console.error('Query Error:', error);
        }
      }
    },
  },
});

function App() {
  useCapacitorBackButton();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <SmoothScrollProvider>
          <ScrollToTop />
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
            <Route path="/ai-voice-agent" element={<ProtectedRoute><AIVoiceAgent /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
            <Route path="/track-order/:orderId" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />
          </Routes>
          <FloatingAIButton />
          <PromoPopup />
          <Toaster />
        </SmoothScrollProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;