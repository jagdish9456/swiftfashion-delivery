import { useState, useCallback } from 'react';
import Voice, { 
  SpeechResultsEvent, 
  SpeechErrorEvent 
} from '@react-native-voice/voice';

export const useSpeechRecognition = (onTranscript: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = useCallback(async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const stopListening = useCallback(async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  Voice.onSpeechResults = (e: SpeechResultsEvent) => {
    const transcript = e.value?.[0] || '';
    onTranscript(transcript);
    stopListening();
  };

  Voice.onSpeechError = (e: SpeechErrorEvent) => {
    console.error(e);
    stopListening();
  };

  return {
    isListening,
    startListening,
    stopListening,
  };
};