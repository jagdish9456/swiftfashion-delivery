import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useSpeechRecognition = (onTranscript: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = async () => {
    try {
      // If already listening, don't start a new session
      if (recognitionRef.current && isListening) {
        console.log('Speech recognition is already active');
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(' ');
        onTranscript(transcript);
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
      };

      recognitionRef.current.onend = () => {
        // Only restart if we're still supposed to be listening
        if (isListening) {
          // Add a small delay before restarting to prevent rapid restarts
          setTimeout(() => {
            if (recognitionRef.current && isListening) {
              try {
                recognitionRef.current.start();
              } catch (error) {
                console.error('Error restarting speech recognition:', error);
              }
            }
          }, 100);
        } else {
          setIsListening(false);
        }
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
    }
  };

  return { isListening, startListening, stopListening };
};