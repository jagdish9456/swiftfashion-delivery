import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, ZoomIn, Download } from "lucide-react";
import { tryOnService } from '@/services/tryOnService';
import { toast } from 'sonner';

interface TryOnDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
}

export const TryOnDialog: React.FC<TryOnDialogProps> = ({
  isOpen,
  onClose,
  productImage,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsLoading(true);
    try {
      const images = await tryOnService.generateTryOnImage(selectedFile, productImage);
      setGeneratedImages(images);
      toast.success('Try-on images generated successfully!');
    } catch (error) {
      toast.error('Failed to generate try-on images');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImages[selectedImageIndex];
    link.download = `try-on-image-${selectedImageIndex + 1}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Virtual Try-On</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : 'Upload your photo'}
                </span>
              </label>
            </div>
            
            <Button
              onClick={handleGenerate}
              disabled={!selectedFile || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Try-On Images'
              )}
            </Button>
          </div>

          {/* Generated Images Section */}
          {generatedImages.length > 0 && (
            <div className="space-y-4">
              <div className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                <img
                  src={generatedImages[selectedImageIndex]}
                  alt={`Try-on result ${selectedImageIndex + 1}`}
                  className={`w-full rounded-lg transition-transform ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {generatedImages.map((_, index) => (
                    <Button
                      key={index}
                      variant={selectedImageIndex === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};