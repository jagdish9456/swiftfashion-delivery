import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { man, woman } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FooterText } from "@/components/layout/FooterText";

const menCategories = [
  {
    id: "mens-formal-wear",
    name: "Formal Wear",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
  },
  {
    id: "mens-casual-wear",
    name: "Casual Wear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
  {
    id: "mens-ethnic-wear",
    name: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
  },
  {
    id: "mens-sportswear",
    name: "Sportswear",
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=200",
  },
];

const womenCategories = [
  {
    id: "womens-formal-wear",
    name: "Formal Wear",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
  },
  {
    id: "womens-casual-wear",
    name: "Casual Wear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
  {
    id: "womens-ethnic-wear",
    name: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
  },
  {
    id: "womens-party-wear",
    name: "Party Wear",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
  },
];

export const GenderCategories = () => {
  const [activeTab, setActiveTab] = useState("men");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 flex items-center justify-between border-b">
        <h1 className="text-lg font-semibold">Categories</h1>
      </div>

      <div className="pt-14 px-4">
        <Tabs defaultValue="men" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="men" className="flex items-center gap-2">
              <man className="h-4 w-4" />
              Men
            </TabsTrigger>
            <TabsTrigger value="women" className="flex items-center gap-2">
              <woman className="h-4 w-4" />
              Women
            </TabsTrigger>
          </TabsList>

          <TabsContent value="men" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {menCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="h-auto p-2 flex flex-col items-center gap-2 hover:bg-primary-50 hover:border-primary-200"
                  onClick={() => navigate(`/category/${category.id}`)}
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">
                    {category.name}
                  </span>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="women" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {womenCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="h-auto p-2 flex flex-col items-center gap-2 hover:bg-primary-50 hover:border-primary-200"
                  onClick={() => navigate(`/category/${category.id}`)}
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">
                    {category.name}
                  </span>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex justify-center mt-8">
        <FooterText />
      </div>
    </div>
  );
};