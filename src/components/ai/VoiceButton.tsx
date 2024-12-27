import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceButtonProps {
  isListening: boolean;
  onToggleListening: () => void;
}

export const VoiceButton = ({ isListening, onToggleListening }: VoiceButtonProps) => {
  return (
    <Button
      onClick={onToggleListening}
      className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600"
    >
      {isListening ? (
        <>
          <MicOff className="animate-pulse" />
          Stop Listening
        </>
      ) : (
        <>
          <Mic />
          Start Conversation
        </>
      )}
    </Button>
  );
};