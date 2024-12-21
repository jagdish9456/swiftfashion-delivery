import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserRound } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { FooterText } from "@/components/layout/FooterText";
import { FullWidthBanner } from "@/components/banners/FullWidthBanner";
import { GridCategories } from "@/components/categories/GridCategories";
import { Header } from "@/components/layout/Header";

export const GenderCategories = () => {
  const [activeTab, setActiveTab] = useState("men");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <div className="pt-32 px-4">
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
            <GridCategories gender="men" />
          </TabsContent>

          <TabsContent value="women" className="mt-0">
            <GridCategories gender="women" />
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