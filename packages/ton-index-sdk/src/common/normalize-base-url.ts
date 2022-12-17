
import type { Maybe } from '../types/maybe.js';


export function normalizeBaseUrl(
  baseUrl?: string

): Maybe<string> {

  baseUrl = (baseUrl || '').trim();

  if (!baseUrl) {
    return undefined;
  }

  if (!baseUrl.endsWith('/')) {
    return `${baseUrl}/`;
  }

  return baseUrl;

}
