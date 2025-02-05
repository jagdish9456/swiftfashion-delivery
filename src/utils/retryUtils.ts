const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 5,
  initialDelay: number = 3000,
  maxDelay: number = 30000
): Promise<T> => {
  let retries = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      if (retries >= maxRetries) {
        throw error;
      }

      // Check if it's a rate limit error (429)
      if (error?.status === 429 || error?.code === 429) {
        // Try rotating the API key first
        const { rotateApiKey } = await import('../services/geminiConfig');
        rotateApiKey();
        
        // If we still have retries left, wait before trying again
        delay = Math.min(delay * 2, maxDelay);
        console.log(`Rate limited. Retrying with new API key in ${delay}ms... (Attempt ${retries + 1}/${maxRetries})`);
        await sleep(delay);
        retries++;
      } else {
        // For other errors, throw immediately
        throw error;
      }
    }
  }
};
