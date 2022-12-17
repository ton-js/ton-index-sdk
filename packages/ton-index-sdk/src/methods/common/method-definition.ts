
import type { RequestParams } from '../../common/request-params.js';


/**
 * This structure describes various API methods and
 * their processing rules.
 */
export interface MethodDefinition<
  ParamType = any,
  ResponseType = any,
  ResultType = any
> {

  /**
   * Method's URL.
   */
  url: string;

  /**
   * Parameters serialization function. Optional.
   */
  serializeParams?: (
    (params: ParamType) => RequestParams
  );

  /**
   * Response deserialization function.
   */
  deserializeResponse: (
    (response: ResponseType) => ResultType
  );

}
