import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConversationUIProps {
  conversations: Array<{ role: 'user' | 'assistant', content: string }>;
  transcript: string;
  isListening: boolean;
  onToggleListening: () => void;
}

export const ConversationUI = ({
  conversations,
  transcript,
  isListening,
  onToggleListening,
}: ConversationUIProps) => {
  // Only show the last 4 messages
  const recentConversations = conversations.slice(-4);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-4">
          {recentConversations.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'assistant'
                  ? 'bg-blue-50 text-blue-800'
                  : 'bg-gray-50 text-gray-800 ml-4'
              }`}
            >
              <p className="text-sm">
                {message.role === 'assistant' ? '🤖 Quickkyy: ' : '👤 You: '}
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={onToggleListening}
          className="w-full flex items-center justify-center gap-2"
        >
          {isListening ? (
            <>
              <MicOff className="animate-pulse" />
              Stop Conversation
            </>
          ) : (
            <>
              <Mic />
              Start Conversation
            </>
          )}
        </Button>
      </div>

      {transcript && isListening && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Listening: {transcript}</p>
        </div>
      )}
    </div>
  );
};
