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
      const userMessage = { role: 'user' as const, content: text };
      setConversations(prev => [...prev, userMessage]);
      conversationRef.current.push(userMessage);

      let response = "";
      let finalProducts: Product[] = [];

      // Handle product-specific queries
      if (text.toLowerCase().includes('about first') || text.toLowerCase().includes('about the first')) {
        const firstProduct = products[0];
        if (firstProduct) {
          response = `${firstProduct.name} is a ${firstProduct.description}. It's priced at $${firstProduct.price} and made by ${firstProduct.brand}.`;
          finalProducts = products;
        } else {
          response = "I don't see any products to describe yet. Would you like to search for something specific?";
        }
      } else if (text.toLowerCase().includes('material') && text.toLowerCase().includes('second')) {
        const secondProduct = products[1];
        if (secondProduct) {
          response = `The ${secondProduct.name} is made from premium materials. It's a quality piece from ${secondProduct.brand}.`;
          finalProducts = products;
        } else {
          response = "I don't see a second product to describe. Would you like to search for something specific?";
        }
      } else if (text.toLowerCase().includes('similar') && text.toLowerCase().includes('second')) {
        const secondProduct = products[1];
        if (secondProduct) {
          finalProducts = findSimilarProducts(secondProduct.name, 5);
          response = "Here are similar products you might like:";
        } else {
          response = "I don't see a second product to find similar items for. Would you like to search for something specific?";
        }
      } else {
        // Handle general product search
        const recommendations = await generateProductRecommendations(text, conversationRef.current);
        finalProducts = recommendations.length > 0 
          ? recommendations.map(mapToProduct)
          : findSimilarProducts(text, 5);
        
        response = generateContextualResponse(text, finalProducts);
      }
      
      setProducts(finalProducts);
      setAiResponse(response);
      
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
      return "I couldn't find any matches. Could you be more specific?";
    }
    
    if (userInput.toLowerCase().includes('price')) {
      return `The ${foundProducts[0].name} costs $${foundProducts[0].price}`;
    }
    
    if (userInput.toLowerCase().includes('add to cart')) {
      return `Added ${foundProducts[0].name} to your cart`;
    }
    
    return `Found ${foundProducts.length} items that match your style. Need more details?`;
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