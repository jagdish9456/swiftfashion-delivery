import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Search, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Mock data - In a real app, this would come from an API
  const product = {
    id: "1",
    name: "Solid Polo Collar T-shirt",
    price: 36,
    originalPrice: 60,
    discount: "60% off",
    rating: 4.3,
    ratingCount: 2814,
    image: "/lovable-uploads/55a80d4f-cc66-44c0-add1-267784bef2cf.png",
    details: {
      color: "Pink",
      length: "Regular",
      type: "Polo",
      sleeve: "Half Sleeve",
    },
    description: "Slip into this trendy and attractive polo t-shirt and look stylish effortlessly. Made to accentuate any body type, it will give you that extra oomph and make you stand out wherever you are. Keep the accessories minimal for that added elegant look, just your favourite watch and sunglasses, and of course, don't forget your pretty smile!",
    similarProducts: [
      {
        id: "2",
        name: "Solid Polo Collar T-shirt",
        price: 36,
        originalPrice: 60,
        discount: "60% off",
        image: "/lovable-uploads/55a80d4f-cc66-44c0-add1-267784bef2cf.png",
      },
      {
        id: "3",
        name: "Men Slim Fit Casual Shirt",
        price: 19.9,
        originalPrice: 57,
        discount: "65% off",
        image: "/lovable-uploads/e9378036-26ff-4163-be71-29ae045c1c09.png",
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
      image: product.image,
      quantity: 1,
    });
    toast({
      title: "Added to bag",
      description: "Product has been added to your shopping bag",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 flex items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base font-medium truncate max-w-[200px]">
            {product.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="pt-[48px]">
        <div className="aspect-square bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 py-3 space-y-4">
        <div>
          <h2 className="text-lg font-medium">{product.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl font-semibold">${product.price}</span>
            <span className="text-gray-500 line-through text-sm">
              ${product.originalPrice}
            </span>
            <span className="text-primary-500 text-sm">{product.discount}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-primary-500 text-white text-sm px-2 py-0.5 rounded">
              {product.rating} ★
            </span>
            <span className="text-sm text-gray-500">
              {product.ratingCount} ratings
            </span>
          </div>
        </div>

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