import { VoiceButton } from "./VoiceButton";
import { TranscriptDisplay } from "./TranscriptDisplay";

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
    <>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto">
          <VoiceButton 
            isListening={isListening}
            onToggleListening={onToggleListening}
          />
        </div>
      </div>
      <TranscriptDisplay 
        transcript={transcript}
        isListening={isListening}
      />
    </>
  );
};
