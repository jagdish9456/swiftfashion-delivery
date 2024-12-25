import { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Package2, MoreVertical, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductsCarousel } from "@/components/product/ProductsCarousel";
import { GoogleMap, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "30vh",
};

const center = {
  lat: 17.4485835,
  lng: 78.3908034,
};

export const TrackOrder = () => {
  const { orderId } = useParams();
  const [activeDelivery, setActiveDelivery] = useState("DELIVERY1");

  const mustHaveItems = [
    {
      id: "1",
      name: "Fresh Fruits Pack",
      price: 199,
      originalPrice: 299,
      discount: "33% OFF",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500"
    },
    // ... Add more items
  ];

  const deliveryContent = (
    <>
      <div className="h-[30vh] bg-gray-100">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>

      <div className="p-3">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-bold">Arriving in 8 mins</h2>
              <p className="text-xs text-gray-500">to Home - d-2001 d block, mantri celestia...</p>
            </div>

            <div className="flex items-center gap-2 py-2 border-t border-dashed">
              <Package2 className="h-5 w-5 text-primary-500" />
              <div>
                <h3 className="text-sm font-semibold">Order is getting packed</h3>
                <button className="text-xs text-primary-500">See all items &gt;</button>
              </div>
            </div>

            <div className="flex items-center gap-2 py-2 border-t border-dashed">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-semibold">We'll assign a delivery partner soon</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 bg-primary-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Special Offers for You!</p>
            <ChevronRight className="h-4 w-4 text-primary-500" />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Must Have Items</h3>
          <ProductsCarousel products={mustHaveItems} title="" />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Link to="/" className="p-1.5">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-sm font-semibold">Order #{orderId}</h1>
            <p className="text-xs text-gray-500">11:30 PM | 5 Items, ₹386</p>
          </div>
        </div>
        <button className="p-1.5">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <Tabs defaultValue="DELIVERY1" className="w-full">
        <div className="bg-white px-3 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="DELIVERY1">DELIVERY 1</TabsTrigger>
            <TabsTrigger value="DELIVERY2">DELIVERY 2</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="DELIVERY1" className="mt-0">
          {deliveryContent}
        </TabsContent>

        <TabsContent value="DELIVERY2" className="mt-0">
          {deliveryContent}
        </TabsContent>
      </Tabs>
    </div>
  );
};