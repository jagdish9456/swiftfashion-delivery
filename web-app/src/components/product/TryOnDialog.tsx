import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TryOnService } from '@/services/tryOnService';
import { Loader2, Upload, ZoomIn } from 'lucide-react';

interface TryOnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productImage: string;
}

export const TryOnDialog: React.FC<TryOnDialogProps> = ({
  open,
  onOpenChange,
  productImage
}) => {
  const { toast } = useToast();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUserImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateTryOnImages = async () => {
    if (!userImage) return;

    setIsLoading(true);
    try {
      const tryOnService = new TryOnService('YOUR_RUNWARE_API_KEY'); // Replace with actual API key handling
      const images = await tryOnService.generateTryOnImages(userImage, productImage);
      setGeneratedImages(images);
    } catch (error) {
      toast({
        title: "Error generating images",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Virtual Try-On</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Your Photo</label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
              {userImage && (
                <Button
                  onClick={generateTryOnImages}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {userImage && (
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Your Photo</h3>
              <img
                src={userImage}
                alt="User uploaded"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          )}

          {generatedImages.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Generated Try-On Images</h3>
              <div className="grid grid-cols-3 gap-4">
                {generatedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Try-on ${index + 1}`}
                      className="w-full h-48 object-cover rounded"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-2 right-2"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};