type QueuedRequest = {
  id: string;
  execute: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
};

class RequestQueue {
  private queue: QueuedRequest[] = [];
  private processing = false;
  private requestsThisMinute = 0;
  private lastRequestTime = Date.now();
  private readonly MAX_REQUESTS_PER_MINUTE = 30; // Reduced from 60 to be more conservative
  private readonly MIN_REQUEST_INTERVAL = 5000; // Increased from 3s to 5s

  async add<T>(execute: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        id: Math.random().toString(36).substring(7),
        execute,
        resolve,
        reject,
      });
      
      if (!this.processing) {
        this.processQueue();
      }
    });
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
      const waitTime = 60000 - (now - this.lastRequestTime) + 1000; // Add 1s buffer
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
    } catch (error) {
      request.reject(error);
    }

    // Process next request with a delay to prevent rapid consecutive failures
    setTimeout(() => this.processQueue(), this.MIN_REQUEST_INTERVAL);
  }
}

export const requestQueue = new RequestQueue();