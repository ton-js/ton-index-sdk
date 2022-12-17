
import type { Values } from '../types/values.js';


export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc',

} as const;

export type SortDirectionType = Values<typeof SortDirection>;
