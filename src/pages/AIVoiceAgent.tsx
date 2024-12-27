import { Platform } from 'react-native-web';
import { AIVoiceAgentWeb } from '@/components/ai/AIVoiceAgentWeb';
import { AIVoiceAgentMobile } from '@/components/ai/AIVoiceAgentMobile';

export const AIVoiceAgent = () => {
  return Platform.OS === 'web' ? <AIVoiceAgentWeb /> : <AIVoiceAgentMobile />;
};