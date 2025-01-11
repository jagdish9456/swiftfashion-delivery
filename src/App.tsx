import { Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login";
import { Index } from "./pages/Index";
import { Categories } from "./pages/Categories";
import { ProductDetails } from "./pages/ProductDetails";
import { GenderCategories } from "./pages/GenderCategories";
import { SetLocation } from "./pages/SetLocation";
import { Profile } from "./pages/Profile";
import { ProfileDetails } from "./pages/ProfileDetails";
import { Orders } from "./pages/Orders";
import { Cart } from "./pages/Cart";
import { NearYou } from "./pages/NearYou";
import { Notifications } from "./pages/Notifications";
import { AIChat } from "./pages/AIChat";
import { AIVoiceAgent } from "./pages/AIVoiceAgent";
import { Wishlist } from "./pages/Wishlist";
import { SearchResults } from "./pages/SearchResults";
import { TrackOrder } from "./pages/TrackOrder";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DeliveryIndex } from "./pages/delivery/Index";
import { SearchOrder } from "./pages/delivery/SearchOrder";
import { PickupScreen } from "./pages/delivery/PickupScreen";
import { DeliveryProfile } from "./pages/delivery/Profile";
import { DeliveryWallet } from "./pages/delivery/Wallet";
import { DeliveryChat } from "./pages/delivery/Chat";
import { OrderDetailsScreen } from "./pages/delivery/OrderDetailsScreen";
import { DropLocationScreen } from "./pages/delivery/DropLocationScreen";

// Import shop pages
import { ShopDashboard } from "./pages/shop/Index"
import { Menu } from "./pages/shop/Menu"

import { VRView } from "./pages/VRView";
import { VRCategoryView } from "./vr/components/VRCategoryView";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Customer Routes */}
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
      <Route path="/vr-view" element={<ProtectedRoute><VRView /></ProtectedRoute>} />
      <Route path="/vr-category/:categoryId" element={<ProtectedRoute><VRCategoryView /></ProtectedRoute>} />
      <Route path="/delivery" element={<ProtectedRoute><DeliveryIndex /></ProtectedRoute>} />
      <Route path="/delivery/search-order" element={<ProtectedRoute><SearchOrder /></ProtectedRoute>} />
      <Route path="/delivery/pickup/:orderId" element={<ProtectedRoute><PickupScreen /></ProtectedRoute>} />
      <Route path="/delivery/order-details/:orderId" element={<ProtectedRoute><OrderDetailsScreen /></ProtectedRoute>} />
      <Route path="/delivery/drop-location/:orderId" element={<ProtectedRoute><DropLocationScreen /></ProtectedRoute>} />
      <Route path="/delivery/profile" element={<ProtectedRoute><DeliveryProfile /></ProtectedRoute>} />
      <Route path="/delivery/wallet" element={<ProtectedRoute><DeliveryWallet /></ProtectedRoute>} />
      <Route path="/delivery/chat" element={<ProtectedRoute><DeliveryChat /></ProtectedRoute>} />

      {/* Protected Shop Partner Routes */}
      <Route path="/shop" element={<ProtectedRoute><ShopDashboard /></ProtectedRoute>} />
      <Route path="/shop/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
      <Route path="/shop/profile" element={<ProtectedRoute><ShopDashboard /></ProtectedRoute>} />
      <Route path="/shop/settings" element={<ProtectedRoute><ShopDashboard /></ProtectedRoute>} />
      <Route path="/shop/metrics" element={<ProtectedRoute><ShopDashboard /></ProtectedRoute>} />
    </Routes>
  )
}
