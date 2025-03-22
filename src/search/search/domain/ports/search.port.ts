import { Observable } from 'rxjs';
import { SearchQuery, SearchResult } from './search-strategy';

export interface SearchStrategyPort {
  search(query: SearchQuery): Observable<SearchResult>; // Método de búsqueda

  origin(): string; // Origen de búsqueda
}
