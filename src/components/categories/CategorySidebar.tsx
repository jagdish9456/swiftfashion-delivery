import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, ShirtIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const categories = [
  {
    title: "Formal Wear",
    icon: ShirtIcon,
    path: "formal-wear",
    subcategories: [
      { name: "Suits", path: "suits" },
      { name: "Dress Shirts", path: "dress-shirts" },
      { name: "Blazers", path: "blazers" },
      { name: "Formal Trousers", path: "formal-trousers" },
    ],
  },
  {
    title: "Casual Wear",
    icon: ShirtIcon,
    path: "casual-wear",
    subcategories: [
      { name: "T-Shirts", path: "t-shirts" },
      { name: "Jeans", path: "jeans" },
      { name: "Shorts", path: "shorts" },
      { name: "Polo Shirts", path: "polo-shirts" },
    ],
  },
  {
    title: "Accessories",
    icon: ShirtIcon,
    path: "accessories",
    subcategories: [
      { name: "Belts", path: "belts" },
      { name: "Ties", path: "ties" },
      { name: "Watches", path: "watches" },
      { name: "Cufflinks", path: "cufflinks" },
    ],
  },
];

export const CategorySidebar = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryPath: string) => {
    setExpandedCategory(expandedCategory === categoryPath ? null : categoryPath);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.path}>
                  <SidebarMenuButton
                    onClick={() => toggleCategory(category.path)}
                    className="justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      <span>{category.title}</span>
                    </div>
                    {expandedCategory === category.path ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </SidebarMenuButton>
                  {expandedCategory === category.path && (
                    <SidebarMenuSub>
                      {category.subcategories.map((subcategory) => (
                        <SidebarMenuSubItem key={subcategory.path}>
                          <SidebarMenuSubButton
                            onClick={() =>
                              navigate(`/category/${category.path}/${subcategory.path}`)
                            }
                          >
                            {subcategory.name}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};