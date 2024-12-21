import { MainLayout } from "@/components/layout/MainLayout";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductImageCarousel } from "@/components/product/ProductImageCarousel";
import { ProductInfo } from "@/components/product/ProductInfo";

const ProductDetails = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <ProductHeader />
        <ProductImageCarousel />
        <ProductInfo />
      </div>
    </MainLayout>
  );
};

export default ProductDetails;