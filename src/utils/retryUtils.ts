const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 5,
  initialDelay: number = 3000, // Increased initial delay to 3 seconds
  maxDelay: number = 30000 // Maximum delay of 30 seconds
): Promise<T> => {
  let retries = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      if (retries >= maxRetries || (error?.status !== 429 && error?.code !== 429)) {
        throw error;
      }

      // Calculate next delay with exponential backoff, but cap it
      delay = Math.min(delay * 2, maxDelay);
      
      console.log(`Rate limited. Retrying in ${delay}ms... (Attempt ${retries + 1}/${maxRetries})`);
      await sleep(delay);
      retries++;
    }
  }
};