import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserRound } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { FooterText } from "@/components/layout/FooterText";
import { FullWidthBanner } from "@/components/banners/FullWidthBanner";
import { GridCategories } from "@/components/categories/GridCategories";

export const GenderCategories = () => {
  const [activeTab, setActiveTab] = useState("men");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 flex items-center justify-between border-b">
        <h1 className="text-lg font-semibold">Categories</h1>
      </div>

      <div className="pt-14 px-4">
        <FullWidthBanner />
        <Tabs defaultValue="men" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="men" className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              Men
            </TabsTrigger>
            <TabsTrigger value="women" className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              Women
            </TabsTrigger>
          </TabsList>

          <TabsContent value="men" className="mt-0">
            <GridCategories />
          </TabsContent>

          <TabsContent value="women" className="mt-0">
            <GridCategories />
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex justify-center mt-8">
        <FooterText />
      </div>
      <BottomNav />
    </div>
  );
};