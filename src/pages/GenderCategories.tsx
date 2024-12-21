import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GridCategories } from "@/components/categories/GridCategories";
import { FullWidthBanner } from "@/components/banners/FullWidthBanner";

export const GenderCategories = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <FullWidthBanner
          title="Explore Categories"
          description="Find what you're looking for"
          className="h-24"
        />
        <Tabs defaultValue="men" className="w-full px-4">
          <TabsList className="w-full">
            <TabsTrigger value="men" className="flex-1">
              Men
            </TabsTrigger>
            <TabsTrigger value="women" className="flex-1">
              Women
            </TabsTrigger>
          </TabsList>
          <TabsContent value="men">
            <GridCategories gender="men" />
          </TabsContent>
          <TabsContent value="women">
            <GridCategories gender="women" />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};