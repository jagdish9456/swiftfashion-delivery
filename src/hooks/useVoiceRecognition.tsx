import { useState, useCallback, useEffect, useRef } from 'react';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { toast } from '@/hooks/use-toast';

export const useVoiceRecognition = (onTranscript: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const isWebPlatform = typeof window !== 'undefined' && 'webkitSpeechRecognition' in window;

  const checkWebPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Web permission check error:', error);
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice features.",
        variant: "destructive",
      });
      return false;
    }
  };

  const checkMobilePermissions = async () => {
    try {
      await SpeechRecognition.requestPermissions();
      return true;
    } catch (error) {
      console.error('Mobile permission check error:', error);
      return false;
    }
  };

  const startWebRecognition = async () => {
    const hasPermission = await checkWebPermissions();
    if (!hasPermission) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      stopListening();
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      stopListening();
      toast({
        title: "Error",
        description: "Failed to recognize speech. Please try again.",
        variant: "destructive",
      });
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const startMobileRecognition = async () => {
    const hasPermission = await checkMobilePermissions();
    if (!hasPermission) return;

    try {
      await SpeechRecognition.start({
        language: 'en-US',
        maxResults: 1,
        prompt: 'Speak now...',
        partialResults: false,
        popup: true,
      });
      setIsListening(true);
    } catch (error) {
      console.error('Start mobile listening error:', error);
      toast({
        title: "Error",
        description: "Failed to start voice recognition. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startListening = async () => {
    if (isWebPlatform) {
      await startWebRecognition();
    } else {
      await startMobileRecognition();
    }
  };

  const stopListening = async () => {
    if (isWebPlatform && recognitionRef.current) {
      recognitionRef.current.stop();
    } else {
      try {
        await SpeechRecognition.stop();
      } catch (error) {
        console.error('Stop listening error:', error);
      }
    }
    setIsListening(false);
  };

  const speak = async (text: string) => {
    try {
      if (isWebPlatform) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } else {
        await TextToSpeech.speak({
          text,
          lang: 'en-US',
          rate: 1.0,
          pitch: 1.0,
          volume: 1.0,
          category: 'ambient',
        });
      }
    } catch (error) {
      console.error('Text to speech error:', error);
    }
  };

  useEffect(() => {
    if (!isWebPlatform) {
      SpeechRecognition.addListener('partialResults', (data: { matches: string[] }) => {
        if (data.matches?.[0]) {
          onTranscript(data.matches[0]);
        }
      });

      SpeechRecognition.addListener('listeningState', (data: { status: 'started' | 'stopped' }) => {
        if (data.status === 'stopped') {
          setIsListening(false);
        }
      });

      return () => {
        SpeechRecognition.removeAllListeners();
        stopListening();
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isWebPlatform, onTranscript]);

  return {
    isListening,
    startListening,
    stopListening,
    speak,
  };
};