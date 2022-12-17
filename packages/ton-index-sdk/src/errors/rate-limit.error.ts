
export class RateLimitError extends Error {

  constructor() {
    super(
      'API rate limit exceeded, please use the API key ' +
      'or decrease the number of requests'
    );
  }

}
