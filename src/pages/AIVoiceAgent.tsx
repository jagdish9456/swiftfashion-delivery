import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateProductRecommendations, generateContextualResponse } from "@/services/gemini";
import { toast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { ProductRecommendations } from "@/components/ai/ProductRecommendations";
import { VoiceButton } from "@/components/ai/VoiceButton";
import { TranscriptDisplay } from "@/components/ai/TranscriptDisplay";
import { ShimmerLoader } from "@/components/ui/shimmer";

export const AIVoiceAgent = () => {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    await handleSubmit(text);
  };

  const { isListening, startListening, stopListening } = useSpeechRecognition(handleTranscript);

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      let response = "";
      let finalProducts = [];

      if (text.toLowerCase().includes('about first') || text.toLowerCase().includes('about the first')) {
        const firstProduct = products[0];
        if (firstProduct) {
          response = await generateContextualResponse(text, [firstProduct], aiResponse);
          finalProducts = products;
        } else {
          response = "I don't see any products to describe yet. Would you like to search for something specific?";
        }
      } else if (text.toLowerCase().includes('material') && text.toLowerCase().includes('second')) {
        const secondProduct = products[1];
        if (secondProduct) {
          response = await generateContextualResponse(text, [secondProduct], aiResponse);
          finalProducts = products;
        } else {
          response = "I don't see a second product to describe. Would you like to search for something specific?";
        }
      } else {
        const recommendations = await generateProductRecommendations(text);
        finalProducts = recommendations;
        response = await generateContextualResponse(text, finalProducts, aiResponse);
      }
      
      setProducts(finalProducts);
      setAiResponse(response);
      
      const speech = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(speech);

    } catch (error: any) {
      // Only show error toast if it's not a retry-related error
      if (error?.status !== 429) {
        toast({
          title: "Error",
          description: "Failed to process your request. Please try again.",
          variant: "destructive",
        });
      }
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setTranscript("");
      stopListening();
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleBack = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/ai-chat");
    }, 100);
  };

  useEffect(() => {
    const greeting = "Hi! I'm Quickkyy. How can I help you find the perfect item today?";
    setAiResponse(greeting);
    
    const speech = new SpeechSynthesisUtterance(greeting);
    window.speechSynthesis.speak(speech);
    
    return () => {
      window.speechSynthesis.cancel();
      stopListening();
    };
  }, []);

  if (isNavigating) {
    return (
      <div className="min-h-screen pb-16 bg-gray-50">
        <div className="bg-white text-gray-900 p-4 flex items-center gap-2 shadow-sm">
          <ShimmerLoader className="h-8 w-8" />
          <ShimmerLoader className="h-6 w-48" />
        </div>
        <main className="p-4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <ShimmerLoader key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-gray-50 overflow-x-hidden">
      <div className="bg-white text-gray-900 p-4 flex items-center gap-2 shadow-sm sticky top-0 z-50">
        <button 
          onClick={handleBack} 
          className="p-2 active:scale-95 transition-transform"
          style={{ touchAction: 'manipulation' }}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Quickkyy - AI Voice Assistant</h1>
      </div>
      
      <main className="p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <ShimmerLoader key={i} className="h-48 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <ProductRecommendations 
              products={products}
              isLoading={isLoading}
            />
          )}
          
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <div className="max-w-2xl mx-auto">
              <VoiceButton 
                isListening={isListening}
                onToggleListening={handleToggleListening}
              />
            </div>
          </div>

          <TranscriptDisplay 
            transcript={transcript}
            isListening={isListening}
          />
        </div>
      </main>
    </div>
  );
};