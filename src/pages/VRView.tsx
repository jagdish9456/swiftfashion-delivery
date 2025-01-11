import { VRScene } from "@/vr/components/VRScene";
import { Suspense, useEffect } from "react";

export const VRView = () => {
  useEffect(() => {
    // Request fullscreen when component mounts
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen();
        }
      } catch (error) {
        console.log("Fullscreen request failed:", error);
      }
    };

    enterFullscreen();

    // Cleanup: exit fullscreen when component unmounts
    return () => {
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen && (document as any).webkitFullscreenElement) {
        (document as any).webkitExitFullscreen();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<div className="text-white">Loading VR Experience...</div>}>
        <VRScene />
      </Suspense>
    </div>
  );
};