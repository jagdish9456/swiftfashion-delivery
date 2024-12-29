import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductImageCarousel } from "@/components/product/ProductImageCarousel";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductsCarousel } from "@/components/product/ProductsCarousel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useState } from "react";
import { TryOnDialog } from "@/components/product/TryOnDialog";

const ProductDetails = () => {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Mock data - In a real app, this would come from an API
  const product = {
    id: "1",
    name: "Premium Cotton Casual Shirt",
    price: 36,
    originalPrice: 60,
    discount: "60% off",
    rating: 4.3,
    ratingCount: 2814,
    brand: "StyleCraft",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
    ],
    details: {
      color: "Pink",
      length: "Regular",
      type: "Casual",
      sleeve: "Full Sleeve",
    },
    description: "Slip into this trendy and attractive casual shirt and look stylish effortlessly. Made with premium cotton to accentuate any body type, it will give you that extra oomph and make you stand out wherever you are. Keep the accessories minimal for that added elegant look, just your favourite watch and sunglasses, and of course, don't forget your pretty smile!",
  };

  const similarProducts = [
    {
      id: "2",
      name: "Classic Linen Shirt",
      price: 36,
      originalPrice: 60,
      discount: "60% off",
      image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800",
    },
    {
      id: "3",
      name: "Slim Fit Oxford Shirt",
      price: 19.9,
      originalPrice: 57,
      discount: "65% off",
      image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800",
    },
    {
      id: "4",
      name: "Casual Denim Shirt",
      price: 45,
      originalPrice: 75,
      discount: "40% off",
      image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800",
    },
    {
      id: "5",
      name: "Striped Cotton Shirt",
      price: 29.9,
      originalPrice: 49.9,
      discount: "40% off",
      image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800",
    },
  ];

  const brandProducts = [
    {
      id: "6",
      name: `${product.brand} Premium Polo`,
      price: 42,
      originalPrice: 70,
      discount: "40% off",
      image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800",
    },
    {
      id: "7",
      name: `${product.brand} Summer T-Shirt`,
      price: 24.9,
      originalPrice: 49.9,
      discount: "50% off",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
    },
    {
      id: "8",
      name: `${product.brand} Formal Shirt`,
      price: 54.9,
      originalPrice: 89.9,
      discount: "39% off",
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800",
    },
    {
      id: "9",
      name: `${product.brand} Casual Blazer`,
      price: 89.9,
      originalPrice: 149.9,
      discount: "40% off",
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800",
    },
  ];

  const sizeChart = {
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    measurements: {
      XS: "33.0",
      S: "36.3",
      M: "39.5",
      L: "42.5",
      XL: "45.5",
      XXL: "48.8",
    },
  };
  const [tryOnDialogOpen, setTryOnDialogOpen] = useState(false);

  const handleAddToBag = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast({
      title: "Added to bag",
      description: "Product has been added to your shopping bag",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <ProductHeader name={product.name} />
      <ProductImageCarousel images={product.images} name={product.name} />

      <div className="px-4 py-3 space-y-4">
        <ProductInfo
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          rating={product.rating}
          ratingCount={product.ratingCount}
        />

        {/* Size Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">SIZE</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-primary-500 h-7 px-2">
                  SIZE CHART
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Size Chart</DialogTitle>
                <div className="p-4">
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      className="text-primary-500"
                      size="sm"
                    >
                      INCH
                    </Button>
                    <Button variant="ghost" size="sm">
                      CM
                    </Button>
                  </div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">SIZE</th>
                        <th className="text-left py-2">CHEST</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.sizes.map((size) => (
                        <tr key={size} className="border-b">
                          <td className="py-2">{size}</td>
                          <td className="py-2">{sizeChart.measurements[size]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Tip: For the best fit, buy one size larger than your usual size.
          </p>
          <div className="flex gap-3">
            {["XS", "S", "M", "L"].map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                className={`flex-1 ${
                  selectedSize === size
                    ? "bg-primary-500 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <h3 className="font-medium mb-2">COLOR</h3>
          <div className="flex gap-4">
            {[
              { id: "black", color: "bg-black" },
              { id: "red", color: "bg-red-500" },
              { id: "blue", color: "bg-blue-500" },
            ].map(({ id, color }) => (
              <button
                key={id}
                className={`w-8 h-8 rounded-full ${color} relative`}
                onClick={() => setSelectedColor(id)}
              >
                {selectedColor === id && (
                  <Check className="absolute inset-0 m-auto text-white h-5 w-5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-medium mb-2">PRODUCT DETAILS</h3>
          <div className="space-y-2">
            {Object.entries(product.details).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="text-gray-500 w-24 capitalize">{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Description */}
        <div>
          <h3 className="font-medium mb-2">PRODUCT DESCRIPTION</h3>
          <p className="text-sm text-gray-700">
            {isDescriptionExpanded
              ? product.description
              : product.description.slice(0, 150) + "..."}
          </p>
          <Button
            variant="ghost"
            className="text-primary-500 h-8 px-0"
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            {isDescriptionExpanded ? "View Less" : "View More"}
          </Button>
        </div>

        {/* Similar Products */}
        <ProductsCarousel
          products={similarProducts}
          title="SIMILAR PRODUCTS"
        />

        {/* More from this brand */}
        <ProductsCarousel
          products={brandProducts}
          title={`MORE FROM ${product.brand.toUpperCase()}`}
        />
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-4">
        <Button
          variant="outline"
          className="flex-1 border-primary-500 text-primary-500 hover:bg-primary-50"
          onClick={handleAddToBag}
        >
          ADD TO BAG
        </Button>
        <Button className="flex-1 bg-red-500 hover:bg-red-600">
          BUY NOW
        </Button>
        <Button
          variant="secondary"
          onClick={() => setTryOnDialogOpen(true)}
          className="flex-shrink-0"
        >
          Try It On
        </Button>
      </div>

      <TryOnDialog
        open={tryOnDialogOpen}
        onOpenChange={setTryOnDialogOpen}
        productImage={product.images[0]}
      />
    </div>
  );
};

export default ProductDetails;
