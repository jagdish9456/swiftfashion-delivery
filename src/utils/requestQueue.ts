type QueuedRequest = {
  id: string;
  execute: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
  retryCount?: number;
};

class RequestQueue {
  private queue: QueuedRequest[] = [];
  private processing = false;
  private requestsThisMinute = 0;
  private lastRequestTime = Date.now();
  private readonly MAX_REQUESTS_PER_MINUTE = 30; // Reduced from 60 to be more conservative
  private readonly MIN_REQUEST_INTERVAL = 3000; // 3 seconds between requests
  private readonly MAX_RETRIES = 3;

  async add<T>(execute: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        id: Math.random().toString(36).substring(7),
        execute,
        resolve,
        reject,
        retryCount: 0,
      });
      
      if (!this.processing) {
        this.processQueue();
      }
    });
  }

  private calculateBackoff(retryCount: number): number {
    // Exponential backoff: 3s, 9s, 27s
    return Math.min(3000 * Math.pow(3, retryCount), 30000);
  }

  private async processQueue() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const now = Date.now();

    // Reset counter if a minute has passed
    if (now - this.lastRequestTime >= 60000) {
      this.requestsThisMinute = 0;
      this.lastRequestTime = now;
    }

    // Check if we've hit the rate limit
    if (this.requestsThisMinute >= this.MAX_REQUESTS_PER_MINUTE) {
      const waitTime = 60000 - (now - this.lastRequestTime);
      console.log(`Rate limit reached. Waiting ${waitTime}ms before next request`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.requestsThisMinute = 0;
      this.lastRequestTime = Date.now();
    }

    const request = this.queue.shift();
    if (!request) {
      this.processing = false;
      return;
    }

    try {
      // Ensure minimum interval between requests
      const timeSinceLastRequest = Date.now() - this.lastRequestTime;
      if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
        await new Promise(resolve => 
          setTimeout(resolve, this.MIN_REQUEST_INTERVAL - timeSinceLastRequest)
        );
      }

      const result = await request.execute();
      this.requestsThisMinute++;
      this.lastRequestTime = Date.now();
      request.resolve(result);
    } catch (error: any) {
      // Handle rate limit errors with retries
      if ((error?.status === 429 || error?.status === 403) && (request.retryCount || 0) < this.MAX_RETRIES) {
        const retryCount = (request.retryCount || 0) + 1;
        const backoffTime = this.calculateBackoff(retryCount);
        
        console.log(`Request failed (${error?.status}). Retry ${retryCount}/${this.MAX_RETRIES} in ${backoffTime}ms`);
        
        // Put the request back in the queue with increased retry count
        this.queue.unshift({
          ...request,
          retryCount,
        });
        
        // Wait before processing next request
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      } else {
        request.reject(error);
      }
    }

    // Process next request with a delay
    setTimeout(() => this.processQueue(), this.MIN_REQUEST_INTERVAL);
  }
}

export const requestQueue = new RequestQueue();