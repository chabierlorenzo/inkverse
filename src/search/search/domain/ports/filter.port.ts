import { Observable } from 'rxjs';
import { SearchResult } from './search-strategy';

export interface FilterStrategyPort {
  filter(result: Observable<SearchResult>): Observable<SearchResult>; // Método de filtado
}
