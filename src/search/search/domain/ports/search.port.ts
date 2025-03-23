import { Observable } from 'rxjs';
import { ResultOrigin, SearchQuery, SearchResult } from './search-strategy';

export interface SearchStrategyPort {
  search(query: SearchQuery): Observable<SearchResult>; // Método de búsqueda

  origin(): ResultOrigin; // Origen de búsqueda
}
