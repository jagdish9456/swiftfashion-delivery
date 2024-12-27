import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, MicOff, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateProductRecommendations } from "@/services/openai";
import { ProductList } from "@/components/categories/ProductList";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/layout/BottomNav";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import productsData from "@/data/product-all.json";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    isDefault: boolean;
  }>;
}

export const AIVoiceAgent = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isContinuousMode, setIsContinuousMode] = useState(true);
  const conversationRef = useRef<Array<{ role: string, content: string }>>([]);

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    await handleSubmit(text);
  };

  const { startListening, stopListening } = useSpeechRecognition(handleTranscript);

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      conversationRef.current.push({ role: "user", content: text });

      const recommendations = await generateProductRecommendations(text, conversationRef.current);
      
      let finalProducts = recommendations.length > 0 ? recommendations : 
        findSimilarProducts(text, 5);
      
      setProducts(finalProducts);
      
      const response = generateContextualResponse(text, finalProducts);
      setAiResponse(response);
      
      conversationRef.current.push({ role: "assistant", content: response });
      
      const speech = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(speech);

      if (isContinuousMode) {
        speech.onend = () => {
          startListening();
        };
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

  const findSimilarProducts = (query: string, limit: number): Product[] => {
    const searchTerms = query.toLowerCase().split(' ');
    
    const filteredProducts = productsData.products
      .filter(product => {
        const searchableText = `${product.name} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
        return searchTerms.some(term => searchableText.includes(term));
      })
      .slice(0, limit)
      .map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.images[0]?.url || "/placeholder.svg",
        brand: product.brand,
        images: product.images
      }));

    return filteredProducts;
  };

  const generateContextualResponse = (userInput: string, foundProducts: Product[]): string => {
    if (foundProducts.length === 0) {
      return `I couldn't find exact matches for "${userInput}", but here are some similar items you might like. Would you like me to search for something specific?`;
    }
    
    return `I found ${foundProducts.length} items that match your request for "${userInput}". Would you like me to describe them in detail or help you refine your search?`;
  };

  useEffect(() => {
    const greeting = "Hi! I'm Quickkyy, your AI shopping assistant. How can I help you today? Looking for something specific, or would you like me to guide you through our collection?";
    setAiResponse(greeting);
    const speech = new SpeechSynthesisUtterance(greeting);
    window.speechSynthesis.speak(speech);
    
    if (isContinuousMode) {
      speech.onend = () => {
        startListening();
      };
    }

    return () => {
      window.speechSynthesis.cancel();
      stopListening();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      setIsContinuousMode(false);
    } else {
      startListening();
      setIsContinuousMode(true);
    }
  };

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
                onClick={toggleListening}
                className="w-full flex items-center justify-center gap-2"
              >
                {isListening ? (
                  <>
                    <MicOff className="animate-pulse" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic />
                    Start Conversation
                  </>
                )}
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
