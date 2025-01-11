import { useState } from "react"
import { Bell, Search, Package, BarChart3, Settings, Menu as MenuIcon, LogOut, User, BookOpen, Plus } from "lucide-react"
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const Menu = () => {
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
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/shop")}>
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/shop/menu")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Menu
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
            <h1 className="font-semibold">MENU</h1>
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
              placeholder="Search menu items..." 
              className="pl-9 bg-gray-50"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-28 mb-16 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu Categories</h2>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="starters" className="border rounded-lg bg-white">
            <AccordionTrigger className="px-4">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">Starters</span>
                <span className="text-sm text-gray-500">12 items</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">Chicken 65</h3>
                    <p className="text-sm text-gray-500">₹250</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">Paneer Tikka</h3>
                    <p className="text-sm text-gray-500">₹220</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="main-course" className="border rounded-lg bg-white">
            <AccordionTrigger className="px-4">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">Main Course</span>
                <span className="text-sm text-gray-500">15 items</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">Butter Chicken</h3>
                    <p className="text-sm text-gray-500">₹350</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">Dal Makhani</h3>
                    <p className="text-sm text-gray-500">₹280</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around items-center h-16">
          <Button variant="ghost" className="flex flex-col items-center gap-1" onClick={() => navigate("/shop")}>
            <Package className="h-5 w-5" />
            <span className="text-xs">Orders</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1" onClick={() => navigate("/shop/menu")}>
            <BookOpen className="h-5 w-5" />
            <span className="text-xs">Menu</span>
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