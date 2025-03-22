import { SearchStrategyPort } from 'src/search/search/domain/ports/search.port';
import { GBooksResponse } from '../domain/book';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';

import {
  SearchQuery,
  SearchResult,
} from 'src/search/search/domain/ports/search-strategy';
import { GbooksMapper } from '../domain/services/mapper';

export class GoogleSearch implements SearchStrategyPort {
  constructor(
    private readonly httpService: HttpService,
    private readonly mapper: GbooksMapper,
  ) {}

  search(query: SearchQuery): Observable<SearchResult> {
    const search = `https://www.googleapis.com/books/v1/volumes?q=${query.query}&maxResults=${query.limit || 20}`;

    // console.log(search);
    return this.httpService.get<GBooksResponse>(search).pipe(
      map((response: GBooksResponse) => {
        const books = response.items.map((item) => {
          return this.mapper.convert(item);
        });

        return {
          results: books,
          total: response.totalItems,
          origin: 'google-books',
        };
      }),
    );
  }

  origin() {
    return 'google-books';
  }
}
