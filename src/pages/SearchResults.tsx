import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import products from "@/data/products.json";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = products.products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">Search Results for "{query}"</h1>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-[3/4] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3";
                    }}
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3" onClick={() => navigate(`/product/${item.id}`)}>
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="font-semibold">${item.price}</span>
                  </div>
                  <Button className="w-full mt-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
                    VIEW DETAILS
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};