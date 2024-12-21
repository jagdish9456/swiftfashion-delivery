import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { PromoPopup } from "@/components/popups/PromoPopup";
import { FloatingAIButton } from "@/components/ai/FloatingAIButton";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:id" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/gender-categories" element={<GenderCategories />} />
            <Route path="/set-location" element={<SetLocation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/near-you" element={<NearYou />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/ai-chat" element={<AIChat />} />
          </Routes>
          <FloatingAIButton />
          <PromoPopup />
          <Toaster />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;