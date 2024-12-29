import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { generateProductRecommendations, generateContextualResponse } from '../services/gemini';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { ShimmerLoader } from '../components/common/ShimmerLoader';
import { ProductCard } from '../components/product/ProductCard';
import { AIResponseLoader } from '../components/ai/AIResponseLoader';
import { VoiceControls } from '../components/ai/VoiceControls';

export const AIVoiceAgent = () => {
  const navigation = useNavigation();
  const [transcript, setTranscript] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    await handleSubmit(text);
  };

  const { isListening, startListening, stopListening } = useSpeechRecognition(handleTranscript);

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const recommendations = await generateProductRecommendations(text);
      setProducts(recommendations);
      
      const response = await generateContextualResponse(text, recommendations, aiResponse);
      setAiResponse(response);

      if (Platform.OS !== 'web') {
        const speech = new SpeechSynthesisUtterance(response);
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setTranscript('');
      stopListening();
    }
  };

  useEffect(() => {
    const greeting = "Hi! I'm your AI shopping assistant. How can I help you today?";
    setAiResponse(greeting);
    
    if (Platform.OS !== 'web') {
      const speech = new SpeechSynthesisUtterance(greeting);
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    }
    
    return () => {
      if (Platform.OS !== 'web') {
        window.speechSynthesis.cancel();
      }
      stopListening();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>AI Voice Assistant</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <AIResponseLoader />
        ) : (
          products.map((product: any) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))
        )}
      </ScrollView>

      <VoiceControls
        isListening={isListening}
        transcript={transcript}
        onToggleListening={isListening ? stopListening : startListening}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        paddingTop: 50,
      },
      android: {
        paddingTop: 16,
      },
    }),
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});