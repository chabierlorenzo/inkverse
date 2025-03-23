import {
  BookSearch,
  SearchResult,
} from 'src/search/search/domain/ports/search-strategy';
import { ConsolidateResult } from '../const';

export interface ConsolidateBooks {
  consolidate(result: SearchResult[], search: BookSearch): ConsolidateResult;
}
