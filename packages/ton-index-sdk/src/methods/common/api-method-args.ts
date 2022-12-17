
import type { RequestOptions, TonIndexClient } from '../../ton-index-client/ton-index-client.js';


export interface ApiMethodArgs<ParamsType = any>
  extends RequestOptions<ParamsType>
{
  client: TonIndexClient;

}
