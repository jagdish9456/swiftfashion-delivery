import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useSpeechRecognition = (onTranscript: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const processingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = async () => {
    try {
      if (recognitionRef.current && (isListening || processingRef.current)) {
        console.log('Speech recognition is already active or processing');
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        processingRef.current = false;
      };

      recognitionRef.current.onresult = (event: any) => {
        if (processingRef.current) return;
        
        processingRef.current = true;
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(' ');
        onTranscript(transcript);
        stopListening();
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'aborted') {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to recognize speech. Please try again.",
          });
        }
        setIsListening(false);
        processingRef.current = false;
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        processingRef.current = false;
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Speech recognition is not supported in your browser.",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      processingRef.current = false;
    }
  };

  return { isListening, startListening, stopListening };
};