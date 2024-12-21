import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductList } from "@/components/categories/ProductList";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { FooterText } from "@/components/layout/FooterText";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const fetchProducts = async (categoryId: string): Promise<Product[]> => {
  const response = await fetch(`/api/products?category=${categoryId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFromStore = location.search.includes("store=true");
  const storeName = isFromStore ? "Store Name" : "Category Name"; 

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const categoryId = location.pathname.split("/").pop() || "";
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchProducts(categoryId)
  });

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const handleBack = () => {
    if (isFromStore) {
      navigate("/near-you");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-medium">{storeName}</h1>
          </div>
        </div>

        <div className="flex items-center p-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ProductList products={products} isLoading={isLoading} />

      <FilterSheet
        open={showFilters}
        onOpenChange={setShowFilters}
        onApplyFilters={handleApplyFilters}
      />
      <FooterText />
    </div>
  );
};