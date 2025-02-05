import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { unifiedTryOnService } from '@/services/unifiedTryOnService';
import { TryOnProvider } from '@/services/tryOnConfig';
import { toast } from 'sonner';

export const TryOnConfig = () => {
  const [provider, setProvider] = useState<TryOnProvider>('gemini');
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    unifiedTryOnService.setProvider(provider);
    if (provider === 'fashn' && apiKey) {
      unifiedTryOnService.setFashnApiKey(apiKey);
    }
    toast.success('Try-on configuration updated');
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-medium">Virtual Try-On Configuration</h3>
        <p className="text-sm text-gray-500">
          Configure the virtual try-on service provider and settings.
        </p>
      </div>

      <RadioGroup
        value={provider}
        onValueChange={(value: TryOnProvider) => setProvider(value)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="gemini" id="gemini" />
          <Label htmlFor="gemini">Gemini API</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="fashn" id="fashn" />
          <Label htmlFor="fashn">Fashn.ai API</Label>
        </div>
      </RadioGroup>

      {provider === 'fashn' && (
        <div className="space-y-2">
          <Label htmlFor="apiKey">Fashn.ai API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Fashn.ai API key"
          />
        </div>
      )}

      <Button onClick={handleSave}>Save Configuration</Button>
    </div>
  );
};
