import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

interface VoiceRecognitionButtonProps {
  isListening: boolean;
  onToggle: () => void;
}

export const VoiceRecognitionButton = ({ isListening, onToggle }: VoiceRecognitionButtonProps) => {
  return (
    <Button
      onClick={onToggle}
      className={`w-full flex items-center justify-center gap-2 ${
        isListening ? 'bg-primary-600' : 'bg-primary-500'
      }`}
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