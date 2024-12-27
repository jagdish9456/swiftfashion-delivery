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
  const [conversations, setConversations] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
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
      // Add user message to conversations
      const userMessage = { role: 'user' as const, content: text };
      setConversations(prev => [...prev, userMessage]);
      conversationRef.current.push(userMessage);

      const recommendations = await generateProductRecommendations(text, conversationRef.current);
      
      let finalProducts = recommendations.length > 0 
        ? recommendations.map(mapToProduct)
        : findSimilarProducts(text, 5);
      
      setProducts(finalProducts);
      
      const response = generateContextualResponse(text, finalProducts);
      setAiResponse(response);
      
      // Add AI response to conversations
      const aiMessage = { role: 'assistant' as const, content: response };
      setConversations(prev => [...prev, aiMessage]);
      conversationRef.current.push(aiMessage);
      
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
      return `I couldn't find exact matches for "${userInput}". Could you tell me more about what you're looking for? For example, any specific color, style, or occasion in mind?`;
    }
    
    return `I found ${foundProducts.length} items that match your request. Would you like me to describe their features, or would you prefer to know more about a specific aspect like prices or materials?`;
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    const greeting = "Hi! I'm Quickkyy. How can I help you find the perfect item today?";
    setAiResponse(greeting);
    setConversations([{ role: 'assistant', content: greeting }]);
    
    const speech = new SpeechSynthesisUtterance(greeting);
    window.speechSynthesis.speak(speech);
    
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
            conversations={conversations}
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