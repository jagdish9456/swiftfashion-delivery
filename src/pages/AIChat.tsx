import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateProductRecommendations } from "@/services/gemini";
import { ProductList } from "@/components/categories/ProductList";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/layout/BottomNav";
import { AIResponseLoader } from "@/components/ai/AIResponseLoader";

const predefinedPrompts = [
  "Show me casual t-shirts for everyday outings.",
  "Find me must-have belts for ethnic and western outfits.",
  "Find me natural highlighters for a glowing finish.",
  "Show me chic dresses for cocktail parties."
];

export const AIChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showPrompts, setShowPrompts] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setShowPrompts(false);
    try {
      const recommendations = await generateProductRecommendations(message);
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

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
    setShowPrompts(false);
  };

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <div className="bg-white text-gray-900 p-4 flex items-center gap-2 shadow-sm">
        <button onClick={() => navigate("/")} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-medium">Maya</h1>
          <p className="text-sm text-gray-500">Your ChatGPT powered assistant</p>
        </div>
      </div>
      
      <main className="p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* AI Welcome Message */}
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
              M
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-lg font-medium">Hi, I am Maya ❤️</p>
                <p className="text-gray-600">
                  I am here to help you get your fashion and beauty needs met.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p>How can I assist you today?</p>
              </div>
            </div>
          </div>

          {/* Predefined Prompts */}
          {showPrompts && (
            <div className="space-y-2">
              {predefinedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full p-4 text-left text-primary-600 bg-white rounded-lg shadow-sm hover:bg-primary-50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {isLoading ? (
            <AIResponseLoader />
          ) : (
            products.length > 0 && (
              <div className="mt-6">
                <ProductList products={products} isLoading={isLoading} isAIResult={true} />
              </div>
            )
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="fixed bottom-16 left-0 right-0 p-4 bg-gray-50">
            <div className="max-w-2xl mx-auto relative">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type here..."
                className="w-full p-4 pr-12 rounded-full bg-white border border-gray-200 focus:outline-none focus:border-primary-500"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                disabled={!message.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Floating Voice Button */}
      <div className="fixed left-4 bottom-20 z-50">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => navigate("/ai-voice-agent")}
        >
          <Mic className="h-6 w-6 text-white" />
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};