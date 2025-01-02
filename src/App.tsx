import { Routes, Route } from "react-router-dom";
import { DeliveryIndex } from "./pages/delivery/Index";
import { SearchOrder } from "./pages/delivery/SearchOrder";
import { DeliveryProfile } from "./pages/delivery/Profile";
import { DeliveryWallet } from "./pages/delivery/Wallet";
import { DeliveryChat } from "./pages/delivery/Chat";

export default function App() {
  return (
    <Routes>
      <Route path="/delivery" element={<DeliveryIndex />} />
      <Route path="/delivery/search-order" element={<SearchOrder />} />
      <Route path="/delivery/profile" element={<DeliveryProfile />} />
      <Route path="/delivery/wallet" element={<DeliveryWallet />} />
      <Route path="/delivery/chat" element={<DeliveryChat />} />
    </Routes>
  );
}