import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const AIChat = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement AI integration in next step
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <main className="pt-[116px] px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold mb-4">AI Shopping Assistant</h1>
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about our products..."
              className="min-h-[100px] pr-12 resize-none"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="mt-6">
            {/* Product results will be displayed here */}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};