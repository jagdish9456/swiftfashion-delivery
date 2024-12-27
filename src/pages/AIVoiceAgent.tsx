import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateProductRecommendations } from "@/services/openai";
import { ProductList } from "@/components/categories/ProductList";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/layout/BottomNav";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export const AIVoiceAgent = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    await handleSubmit(text);
  };

  const { startListening } = useSpeechRecognition(handleTranscript);

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const recommendations = await generateProductRecommendations(text);
      setProducts(recommendations);
      
      // Generate AI response
      const response = `Based on your request for "${text}", I've found ${recommendations.length} items that might interest you. Would you like me to describe them in detail or help you refine your search?`;
      setAiResponse(response);
      
      // Use Web Speech API for voice response
      const speech = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(speech);

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

  useEffect(() => {
    // Initial greeting
    const greeting = "Hi! I'm Quickkyy, your AI shopping assistant. How can I help you today? Looking for something specific, or would you like me to guide you through our collection?";
    setAiResponse(greeting);
    const speech = new SpeechSynthesisUtterance(greeting);
    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <div className="bg-white text-gray-900 p-4 flex items-center gap-2 shadow-sm">
        <button onClick={() => navigate("/ai-chat")} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">Quickkyy - AI Voice Assistant</h1>
      </div>
      
      <main className="p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">{aiResponse}</p>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={() => startListening()}
                disabled={isListening}
                className="w-full flex items-center justify-center gap-2"
              >
                <Mic className={isListening ? "animate-pulse" : ""} />
                {isListening ? "Listening..." : "Shop with Voice"}
              </Button>
            </div>

            {transcript && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">You said: {transcript}</p>
              </div>
            )}
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