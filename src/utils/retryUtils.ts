const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> => {
  let retries = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      retries++;
      
      if (retries > maxRetries) {
        throw error;
      }

      if (error?.status === 429 || error?.status === 403) {
        console.log(`API call failed. Retrying in ${delay}ms... (Attempt ${retries}/${maxRetries})`);
        await sleep(delay);
        delay *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
};