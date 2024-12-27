import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateProductRecommendations } from "@/services/openai";
import { ProductList } from "@/components/categories/ProductList";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/layout/BottomNav";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export const AIVoiceAgent = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranscript = async (transcript: string) => {
    if (!transcript.trim()) return;

    setIsLoading(true);
    try {
      const recommendations = await generateProductRecommendations(transcript);
      setProducts(recommendations);
      if (recommendations.length === 0) {
        toast({
          title: "No products found",
          description: "Try different search terms or be more specific",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { isListening, startListening } = useSpeechRecognition(handleTranscript);

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <div className="bg-white text-gray-900 p-4 flex items-center gap-2 shadow-sm">
        <button onClick={() => navigate("/ai-chat")} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Shop with Quickkyy</h1>
      </div>
      
      <main className="p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">
              Hi! I'm Quickkyy, your AI shopping assistant
            </h2>
            <p className="text-gray-600">
              Click the microphone button and tell me what you're looking for
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className={`rounded-full p-6 ${
                isListening ? "bg-red-500 hover:bg-red-600" : ""
              }`}
              onClick={startListening}
            >
              {isListening ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
          </div>

          {products.length > 0 && (
            <div className="mt-6">
              <ProductList products={products} isLoading={isLoading} />
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};