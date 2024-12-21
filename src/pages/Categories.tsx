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

// Static products data for store view
const storeProducts: Product[] = [
  {
    id: "1",
    name: "Elegant Ethnic Dress",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800",
  },
  {
    id: "2",
    name: "Traditional Saree",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
  },
  {
    id: "3",
    name: "Designer Kurta",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800",
  },
  {
    id: "4",
    name: "Festival Collection",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
  },
  {
    id: "5",
    name: "Wedding Lehenga",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
  },
  {
    id: "6",
    name: "Party Wear Suit",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1589810635657-232948472d98?w=800",
  }
];

export const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFromStore = location.search.includes("store=true");
  const storeName = isFromStore ? "Store Name" : "Category Name"; 

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categoryId = location.pathname.split("/").pop() || "";
  
  const { data: products = storeProducts, isLoading } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => Promise.resolve(storeProducts),
    enabled: isFromStore
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
            variant="ghost"
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