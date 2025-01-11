import { useState } from "react"
import { Bell, Search, Package, BarChart3, Settings, Menu, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const ShopDashboard = () => {
  const [activeTab, setActiveTab] = useState<"NEW" | "PREPARING" | "READY" | "PAST">("NEW")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/shop")}>
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/shop/metrics")}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Metrics
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/shop/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <h1 className="font-semibold">MANAGE ORDERS</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/shop/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search orders..." 
              className="pl-9 bg-gray-50"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-28 mb-16 px-4">
        {/* Order Tabs */}
        <div className="bg-gray-900 rounded-lg p-1 flex gap-1 overflow-x-auto -mx-4 px-4">
          <Button
            variant={activeTab === "NEW" ? "default" : "ghost"}
            className={`whitespace-nowrap flex-1 ${activeTab === "NEW" ? "bg-orange-500" : "text-white hover:text-white hover:bg-white/10"}`}
            onClick={() => setActiveTab("NEW")}
          >
            NEW (2)
          </Button>
          <Button
            variant={activeTab === "PREPARING" ? "default" : "ghost"}
            className={`whitespace-nowrap flex-1 ${activeTab === "PREPARING" ? "bg-white" : "text-white hover:text-white hover:bg-white/10"}`}
            onClick={() => setActiveTab("PREPARING")}
          >
            PREPARING
          </Button>
          <Button
            variant={activeTab === "READY" ? "default" : "ghost"}
            className={`whitespace-nowrap flex-1 ${activeTab === "READY" ? "bg-white" : "text-white hover:text-white hover:bg-white/10"}`}
            onClick={() => setActiveTab("READY")}
          >
            READY
          </Button>
          <Button
            variant={activeTab === "PAST" ? "default" : "ghost"}
            className={`whitespace-nowrap flex-1 ${activeTab === "PAST" ? "bg-white" : "text-white hover:text-white hover:bg-white/10"}`}
            onClick={() => setActiveTab("PAST")}
          >
            PAST ORDERS
          </Button>
        </div>

        {/* Order Cards */}
        <div className="space-y-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-orange-500 font-semibold">#567100248</h3>
                <p className="text-sm text-gray-500">2 Items for ₹187.2</p>
                <p className="text-xs text-gray-400">Received 6 minutes ago</p>
              </div>
              <Button variant="outline" size="sm">
                Print
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Hi-Tech Bawarchi</p>
                  <p className="text-sm text-gray-500">MAIN COURSE</p>
                </div>
                <p className="font-medium">₹187.2</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Golconda Chefs</p>
                  <p className="text-sm text-gray-500">STARTERS</p>
                </div>
                <p className="font-medium">₹256.2</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="w-full" variant="secondary">
                MARK OUT OF STOCK
              </Button>
              <Button className="w-full">
                CONFIRM ORDER
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around items-center h-16">
          <Button variant="ghost" className="flex flex-col items-center gap-1" onClick={() => navigate("/shop")}>
            <Package className="h-5 w-5" />
            <span className="text-xs">Orders</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1" onClick={() => navigate("/shop/metrics")}>
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Metrics</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1" onClick={() => navigate("/shop/settings")}>
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}