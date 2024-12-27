import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateProductRecommendations, generateContextualResponse } from '@/services/gemini';
import { toast } from '@/hooks/use-toast';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { ProductRecommendations } from '@/components/ai/ProductRecommendations';
import { VoiceRecognitionButton } from '@/components/ai/VoiceRecognitionButton';
import { TranscriptDisplay } from '@/components/ai/TranscriptDisplay';

export const AIVoiceAgent = () => {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    await handleSubmit(text);
  };

  const { isListening, startListening, stopListening, speak } = useVoiceRecognition(handleTranscript);

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const recommendations = await generateProductRecommendations(text);
      setProducts(recommendations);
      
      const response = await generateContextualResponse(text, recommendations, aiResponse);
      setAiResponse(response);
      
      await speak(response);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setTranscript('');
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    const greeting = "Hi! I'm your AI shopping assistant. How can I help you today?";
    setAiResponse(greeting);
    speak(greeting);
    
    return () => {
      stopListening();
    };
  }, [speak, stopListening]);

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <div className="bg-white text-gray-900 p-4 flex items-center gap-2 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium">AI Voice Assistant</h1>
      </div>
      
      <main className="p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <ProductRecommendations 
            products={products}
            isLoading={isLoading}
          />
          
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <div className="max-w-2xl mx-auto">
              <VoiceRecognitionButton 
                isListening={isListening}
                onToggle={handleToggleListening}
              />
            </div>
          </div>

          <TranscriptDisplay 
            transcript={transcript}
            isListening={isListening}
          />
        </div>
      </main>
    </div>
  );
};