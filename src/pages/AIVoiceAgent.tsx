import React, { useState, useEffect } from 'react';
import Voice from '@react-native-voice/voice';
import { VoiceButton } from '@/components/ai/VoiceButton';
import { ConversationUI } from '@/components/ai/ConversationUI';
import { ProductRecommendations } from '@/components/ai/ProductRecommendations';
import { TranscriptDisplay } from '@/components/ai/TranscriptDisplay';
import { useToast } from '@/components/ui/use-toast';

export const AIVoiceAgent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    Voice.onSpeechStart = () => {
      console.log('Speech started');
    };

    Voice.onSpeechEnd = () => {
      console.log('Speech ended');
    };

    Voice.onSpeechResults = (e: any) => {
      if (e.value && e.value[0]) {
        setTranscript(e.value[0]);
      }
    };

    Voice.onSpeechError = (e: any) => {
      console.error('Speech error:', e);
      toast({
        title: "Error",
        description: "There was an error with speech recognition. Please try again.",
        variant: "destructive"
      });
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [toast]);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      toast({
        title: "Error",
        description: "Could not start voice recognition. Please try again.",
        variant: "destructive"
      });
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">AI Voice Assistant</h1>
      
      <VoiceButton 
        isListening={isListening} 
        onToggleListening={handleToggleListening} 
      />
      
      <TranscriptDisplay transcript={transcript} />
      
      <ConversationUI transcript={transcript} />
      
      <ProductRecommendations transcript={transcript} />
    </div>
  );
};

export default AIVoiceAgent;