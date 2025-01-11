import { VRScene } from "@/vr/components/VRScene";
import { useEffect, useState } from "react";
import { VRErrorBoundary } from "@/vr/components/VRErrorBoundary";

export const VRView = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setHasPermission(true);
        } else {
          setHasPermission(true); // Fallback if fullscreen is not available
        }
      } catch (error) {
        console.error("Fullscreen permission denied:", error);
        setHasPermission(true); // Continue without fullscreen
      }
    };

    checkPermissions();

    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.error);
      }
    };
  }, []);

  if (!hasPermission) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading VR experience...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <VRErrorBoundary>
        <VRScene />
      </VRErrorBoundary>
    </div>
  );
};