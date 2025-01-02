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
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setShowPrompts(false);
    setShowWelcome(false);
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
      <div className="bg-white text-gray-900 p-3 flex items-center gap-2 shadow-sm">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-base font-medium">Maya</h1>
          <p className="text-xs text-gray-500">Your ChatGPT powered assistant</p>
        </div>
      </div>
      
      <main className="p-3 pb-24">
        <div className="max-w-2xl mx-auto space-y-4">
          {showWelcome && (
            <div className="flex gap-2 items-start">
              <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs">
                M
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm font-medium">Hi, I am Maya ❤️</p>
                  <p className="text-xs text-gray-600">
                    I am here to help you get your fashion and beauty needs met.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs">How can I assist you today?</p>
                </div>
              </div>
            </div>
          )}

          {showPrompts && (
            <div className="flex flex-wrap gap-2">
              {predefinedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="p-2 text-xs text-primary-600 bg-white rounded-lg shadow-sm hover:bg-primary-50 transition-colors flex-1"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Search Results with padding bottom to prevent content hiding */}
          <div className="pb-20">
            {isLoading ? (
              <AIResponseLoader />
            ) : (
              products.length > 0 && (
                <div className="mt-4">
                  <ProductList products={products} isLoading={isLoading} isAIResult={true} />
                </div>
              )
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="fixed bottom-16 left-0 right-0 p-3 bg-gray-50">
            <div className="max-w-2xl mx-auto relative">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type here..."
                className="w-full p-3 pr-12 rounded-full bg-white border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled={!message.trim() || isLoading}
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Floating Voice Button - Adjusted position and size */}
      <div className="fixed left-4 bottom-24 z-50">
        <Button
          size="icon"
          className="h-10 w-10 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => navigate("/ai-voice-agent")}
        >
          <Mic className="h-5 w-5 text-white" />
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};