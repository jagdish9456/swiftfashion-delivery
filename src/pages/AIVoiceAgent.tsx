import { Platform } from 'react-native';
import { AIVoiceAgentWeb } from '@/components/ai/AIVoiceAgentWeb';
import { AIVoiceAgentMobile } from '@/components/ai/AIVoiceAgentMobile';

export const AIVoiceAgent = () => {
  return Platform.OS === 'web' ? <AIVoiceAgentWeb /> : <AIVoiceAgentMobile />;
};