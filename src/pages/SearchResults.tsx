import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProductList } from "@/components/categories/ProductList";
import { BottomNav } from "@/components/layout/BottomNav";
import productData from "@/data/product-all.json";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = productData.products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    (product.categoryId && product.categoryId.toLowerCase().includes(query))
  ).map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images?.[0]?.url || "/placeholder.svg",
    description: product.description,
    brand: product.brand || "EssentialWear",
    images: product.images || [{
      id: "default",
      url: "/placeholder.svg",
      alt: product.name,
      isDefault: true
    }]
  }));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 flex items-center gap-2 border-b sticky top-0 z-50">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-medium">Search Results</h1>
          <p className="text-sm text-gray-500">{filteredProducts.length} items found</p>
        </div>
      </div>

      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        ) : (
          <ProductList products={filteredProducts} isLoading={false} />
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};
