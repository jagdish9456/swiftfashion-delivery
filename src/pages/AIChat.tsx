import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { generateProductRecommendations } from "@/services/gemini";
import { ProductList } from "@/components/categories/ProductList";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/layout/BottomNav";
import { AIResponseLoader } from "@/components/ai/AIResponseLoader";

export const AIChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
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

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <div className="bg-white text-gray-900 p-4 flex items-center gap-2 shadow-sm">
        <button onClick={() => navigate("/")} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">AI Shopping Assistant</h1>
      </div>
      
      <main className="p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about our products..."
              className="min-h-[100px] pr-12 resize-none bg-white"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2"
              disabled={!message.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {isLoading ? (
            <AIResponseLoader />
          ) : (
            products.length > 0 && (
              <div className="mt-6">
                <ProductList products={products} isLoading={isLoading} />
              </div>
            )
          )}
        </div>
      </main>

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