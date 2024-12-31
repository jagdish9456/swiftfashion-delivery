import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface VoiceControlsProps {
  isListening: boolean;
  transcript: string;
  onToggleListening: () => void;
}

export const VoiceControls = ({
  isListening,
  transcript,
  onToggleListening,
}: VoiceControlsProps) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
        onPress={onToggleListening}
      >
        <Text style={styles.voiceButtonText}>
          {isListening ? 'Listening...' : 'Tap to Speak'}
        </Text>
      </TouchableOpacity>

      {transcript && (
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptText}>{transcript}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  voiceButton: {
    backgroundColor: '#9b87f5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#7b5cf5',
  },
  voiceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  transcriptContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f4f4f5',
    borderRadius: 8,
  },
  transcriptText: {
    fontSize: 14,
    color: '#666',
  },
});