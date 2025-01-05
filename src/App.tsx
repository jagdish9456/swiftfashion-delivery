import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DeliveryIndex } from "@/pages/delivery/Index";
import { PickupScreen } from "@/pages/delivery/PickupScreen";
import { OrderDetailsScreen } from "@/pages/delivery/OrderDetailsScreen";
import { DropLocationScreen } from "@/pages/delivery/DropLocationScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/delivery" element={<DeliveryIndex />} />
        <Route path="/delivery/pickup" element={<PickupScreen />} />
        <Route path="/delivery/order/:orderId" element={<OrderDetailsScreen />} />
        <Route path="/delivery/drop/:orderId" element={<DropLocationScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
