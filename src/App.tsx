import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import { Categories } from "@/pages/Categories";
import { CartProvider } from "@/contexts/CartContext";
import ProductDetails from "@/pages/ProductDetails";
import { GenderCategories } from "@/pages/GenderCategories";
import { SetLocation } from "@/pages/SetLocation";

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
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;