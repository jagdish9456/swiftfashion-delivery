import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import { Categories } from "@/pages/Categories";
import { CartProvider } from "@/contexts/CartContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:id" element={<Categories />} />
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;