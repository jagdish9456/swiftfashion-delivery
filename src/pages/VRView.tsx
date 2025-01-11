import { VRScene } from "@/vr/components/VRScene";
import { Suspense } from "react";

export const VRView = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<div className="text-white">Loading VR Experience...</div>}>
        <VRScene />
      </Suspense>
    </div>
  );
};