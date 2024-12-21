import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductImageCarousel } from "@/components/product/ProductImageCarousel";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useState } from "react";

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
    similarProducts: [
      {
        id: "2",
        name: "Classic Linen Shirt",
        price: 36,
        originalPrice: 60,
        discount: "60% off",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
      },
      {
        id: "3",
        name: "Slim Fit Oxford Shirt",
        price: 19.9,
        originalPrice: 57,
        discount: "65% off",
        image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800",
      },
    ],
  };

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
                <div className="p-4">
                  <h4 className="font-medium mb-4">Size Chart</h4>
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
        <div>
          <h3 className="font-medium mb-3">SIMILAR PRODUCTS</h3>
          <div className="grid grid-cols-2 gap-4">
            {product.similarProducts.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden bg-white"
              >
                <div className="aspect-square">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h4 className="text-sm font-medium truncate">{item.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm font-semibold">${item.price}</span>
                    <span className="text-xs text-gray-500 line-through">
                      ${item.originalPrice}
                    </span>
                    <span className="text-xs text-green-600">{item.discount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
        <Button className="flex-1 bg-red-500 hover:bg-red-600">BUY NOW</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
