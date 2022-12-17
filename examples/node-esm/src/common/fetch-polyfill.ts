
import fetch, { Headers } from 'node-fetch';


/**
 * Starting from ver. 17 Node.js supports Fetch API
 * natively, we don't want to overwrite it therefore
 * the conditional.
 */
if (
  (typeof (globalThis as any)['fetch'] === 'undefined') ||
  (typeof (globalThis as any)['Headers'] === 'undefined')
) {

  Object.assign(globalThis, {
    fetch,
    Headers,
  });

}
