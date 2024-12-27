import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateProductRecommendations } from "@/services/openai";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/layout/BottomNav";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import productsData from "@/data/product-all.json";
import { ConversationUI } from "@/components/ai/ConversationUI";
import { ProductRecommendations } from "@/components/ai/ProductRecommendations";

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

interface APIProduct {
  id: string;
  name: string;
  description: string;
  price: number;
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
  const [transcript, setTranscript] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const conversationRef = useRef<Array<{ role: string, content: string }>>([]);

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    await handleSubmit(text);
  };

  const { isListening, startListening, stopListening } = useSpeechRecognition(handleTranscript);

  const mapToProduct = (apiProduct: APIProduct): Product => ({
    id: apiProduct.id,
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.price,
    image: apiProduct.images[0]?.url || "/placeholder.svg",
    brand: apiProduct.brand,
    images: apiProduct.images
  });

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      conversationRef.current.push({ role: "user", content: text });

      const recommendations = await generateProductRecommendations(text, conversationRef.current);
      
      let finalProducts = recommendations.length > 0 
        ? recommendations.map(mapToProduct)
        : findSimilarProducts(text, 5);
      
      setProducts(finalProducts);
      
      const response = generateContextualResponse(text, finalProducts);
      setAiResponse(response);
      
      conversationRef.current.push({ role: "assistant", content: response });
      
      const speech = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(speech);

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
    
    return productsData.products
      .filter(product => {
        const searchableText = `${product.name} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
        return searchTerms.some(term => searchableText.includes(term));
      })
      .slice(0, limit)
      .map(mapToProduct);
  };

  const generateContextualResponse = (userInput: string, foundProducts: Product[]): string => {
    if (foundProducts.length === 0) {
      return `I couldn't find exact matches for "${userInput}", but here are some similar items you might like. Would you like me to search for something specific?`;
    }
    
    return `I found ${foundProducts.length} items that match your request for "${userInput}". Would you like me to describe them in detail or help you refine your search?`;
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    const greeting = "Hi! I'm Quickkyy, your AI shopping assistant. How can I help you today? Looking for something specific, or would you like me to guide you through our collection?";
    setAiResponse(greeting);
    
    // Cleanup function to stop listening and speech synthesis when component unmounts
    return () => {
      window.speechSynthesis.cancel();
      stopListening();
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
          <ConversationUI
            aiResponse={aiResponse}
            transcript={transcript}
            isListening={isListening}
            onToggleListening={handleToggleListening}
          />

          <ProductRecommendations 
            products={products}
            isLoading={isLoading}
          />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};