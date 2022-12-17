
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,

} from './http-client.js';


export class TestHttpClient implements HttpClient {

  public async sendRequest(
    request: HttpRequest

  ): Promise<HttpResponse> {

    return {
      status: 200,
      payload: {},
    };

  }

}
