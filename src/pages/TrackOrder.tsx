import { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Phone, Package2, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const TrackOrder = () => {
  const { orderId } = useParams();
  const [activeDelivery, setActiveDelivery] = useState("DELIVERY1");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Order #{orderId}</h1>
            <p className="text-sm text-gray-500">11:30 PM | 5 Items, ₹386</p>
          </div>
        </div>
        <button className="p-2">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* Delivery Tabs */}
      <Tabs defaultValue="DELIVERY1" className="w-full">
        <div className="bg-white px-4 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="DELIVERY1">DELIVERY 1</TabsTrigger>
            <TabsTrigger value="DELIVERY2">DELIVERY 2</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="DELIVERY1" className="mt-0">
          <div className="h-[40vh] bg-gray-100">
            {/* Map would go here - placeholder for now */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map View
            </div>
          </div>

          {/* Order Status Card */}
          <div className="p-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold">Arriving in 8 mins</h2>
                  <p className="text-gray-500 text-sm">to Home - d-2001 d block, mantri celestia, D block man...</p>
                </div>

                <div className="flex items-center gap-3 py-3 border-t border-dashed">
                  <Package2 className="h-6 w-6 text-primary-500" />
                  <div>
                    <h3 className="font-semibold">Order is getting packed</h3>
                    <button className="text-primary-500 text-sm">See all items &gt;</button>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-3 border-t border-dashed">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <p className="font-semibold">We'll assign a delivery partner soon</p>
                  </div>
                </div>

                {/* Safety Banner */}
                <div className="bg-primary-50 rounded-lg p-3 flex items-center justify-between">
                  <p className="text-sm font-medium">Delivery Partner Safety & Fairness</p>
                  <button className="text-primary-500 text-sm font-medium">Know more</button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="DELIVERY2" className="mt-0">
          {/* Similar content structure as DELIVERY1 */}
        </TabsContent>
      </Tabs>
    </div>
  );
};