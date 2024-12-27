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

  const requestMicrophonePermission = async () => {
    try {
      // Request with lower sample rate for better performance
      const constraints = {
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone permission error:', error);
      toast({
        variant: "destructive",
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice features.",
      });
      return false;
    }
  };

  const startListening = async () => {
    try {
      if (recognitionRef.current && (isListening || processingRef.current)) {
        console.log('Speech recognition is already active or processing');
        return;
      }

      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) return;

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      // Optimize for mobile browsers
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        processingRef.current = false;
        console.log('Speech recognition started');
      };

      recognitionRef.current.onresult = (event: any) => {
        if (processingRef.current) return;
        
        processingRef.current = true;
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(' ');
        console.log('Transcript received:', transcript);
        onTranscript(transcript);
        stopListening();
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          toast({
            title: "No speech detected",
            description: "Please try speaking again.",
          });
        } else if (event.error !== 'aborted') {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to recognize speech. Please try again.",
          });
        }
        setIsListening(false);
        processingRef.current = false;
        stopListening();
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        processingRef.current = false;
      };

      // Add a small delay before starting recognition
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Failed to start speech recognition:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to start speech recognition. Please try again.",
          });
          setIsListening(false);
          processingRef.current = false;
        }
      }, 100);

    } catch (error) {
      console.error('Speech recognition error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Speech recognition is not supported in your browser.",
      });
      setIsListening(false);
      processingRef.current = false;
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