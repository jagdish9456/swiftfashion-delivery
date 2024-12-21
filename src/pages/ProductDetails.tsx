import { MainLayout } from "@/components/layout/MainLayout";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductImageCarousel } from "@/components/product/ProductImageCarousel";
import { ProductInfo } from "@/components/product/ProductInfo";

const ProductDetails = () => {
  // This would typically come from a route parameter or API call
  const product = {
    name: "Sample Product",
    price: 99.99,
    originalPrice: 149.99,
    discount: "33% OFF",
    rating: 4.5,
    ratingCount: 128,
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400"
    ]
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <ProductHeader name={product.name} />
        <ProductImageCarousel images={product.images} name={product.name} />
        <ProductInfo
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          rating={product.rating}
          ratingCount={product.ratingCount}
        />
      </div>
    </MainLayout>
  );
};

export default ProductDetails;