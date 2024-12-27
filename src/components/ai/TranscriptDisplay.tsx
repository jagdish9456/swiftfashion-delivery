import React from 'react';

interface TranscriptDisplayProps {
  transcript: string;
  isListening: boolean;
}

export const TranscriptDisplay = ({ transcript, isListening }: TranscriptDisplayProps) => {
  if (!isListening && !transcript) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg animate-in slide-in-from-bottom">
      <div className="max-w-2xl mx-auto">
        {isListening && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500">Listening...</span>
          </div>
        )}
        {transcript && (
          <p className="text-lg font-medium text-gray-800">{transcript}</p>
        )}
      </div>
    </div>
  );
};