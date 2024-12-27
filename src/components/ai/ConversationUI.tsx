import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface ConversationUIProps {
  aiResponse: string;
  transcript: string;
  isListening: boolean;
  onToggleListening: () => void;
}

export const ConversationUI = ({
  aiResponse,
  transcript,
  isListening,
  onToggleListening,
}: ConversationUIProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <p className="text-gray-700 mb-4">{aiResponse}</p>
      
      <div className="flex items-center gap-4">
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

      {transcript && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">You said: {transcript}</p>
        </div>
      )}
    </div>
  );
};