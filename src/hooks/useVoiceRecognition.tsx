import { useState, useCallback, useEffect } from 'react';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { toast } from '@/hooks/use-toast';

export const useVoiceRecognition = (onTranscript: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);

  const checkPermissions = useCallback(async () => {
    try {
      const { available } = await SpeechRecognition.available();
      if (!available) {
        toast({
          title: "Speech Recognition Unavailable",
          description: "Speech recognition is not available on this device.",
          variant: "destructive",
        });
        return false;
      }

      const { state } = await SpeechRecognition.hasPermission();
      if (state === 'granted') return true;

      const { permission } = await SpeechRecognition.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Permission check error:', error);
      return false;
    }
  }, []);

  const startListening = useCallback(async () => {
    try {
      const hasPermission = await checkPermissions();
      if (!hasPermission) return;

      await SpeechRecognition.start({
        language: 'en-US',
        maxResults: 1,
        prompt: 'Speak now...',
        partialResults: false,
        popup: true,
      });
      
      setIsListening(true);
    } catch (error) {
      console.error('Start listening error:', error);
      toast({
        title: "Error",
        description: "Failed to start voice recognition. Please try again.",
        variant: "destructive",
      });
    }
  }, [checkPermissions]);

  const stopListening = useCallback(async () => {
    try {
      await SpeechRecognition.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Stop listening error:', error);
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    try {
      await TextToSpeech.speak({
        text,
        lang: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      });
    } catch (error) {
      console.error('Text to speech error:', error);
    }
  }, []);

  useEffect(() => {
    SpeechRecognition.addListener('partialResults', (data: { value: string[] }) => {
      if (data.value?.[0]) {
        onTranscript(data.value[0]);
      }
    });

    SpeechRecognition.addListener('results', (data: { value: string[] }) => {
      if (data.value?.[0]) {
        onTranscript(data.value[0]);
        stopListening();
      }
    });

    return () => {
      SpeechRecognition.removeAllListeners();
      stopListening();
    };
  }, [onTranscript, stopListening]);

  return {
    isListening,
    startListening,
    stopListening,
    speak,
  };
};