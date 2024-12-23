import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { MessageList } from "@/components/ai/MessageList";
import { Input } from "@/components/ui/input";

interface Message {
  text: string;
  sender: "user" | "ai";
}

const AIChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      sender: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    const aiResponse = await fetchAIResponse(input);
    const aiMessage: Message = {
      text: aiResponse,
      sender: "ai"
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  const fetchAIResponse = async (userInput: string): Promise<string> => {
    // Simulate an API call to get AI response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`AI response to: ${userInput}`);
      }, 1000);
    });
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "ai") {
      toast({
        title: "AI Response",
        description: messages[messages.length - 1].text
      });
    }
  }, [messages, toast]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-xl font-semibold mb-4">AI Chat</h1>
      <MessageList messages={messages} />
      <div className="flex mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSendMessage} className="ml-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default AIChat;