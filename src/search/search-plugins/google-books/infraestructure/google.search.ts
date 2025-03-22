import { SearchStrategyPort } from 'src/search/search/domain/ports/search.port';
import { GBooksResponse } from '../domain/book';
import { HttpService } from '@nestjs/axios';
import { map, Observable, of, switchMap } from 'rxjs';

import {
  SearchQuery,
  SearchResult,
} from 'src/search/search/domain/ports/search-strategy';
import { GbooksMapper } from '../domain/services/mapper';
import { Injectable } from '@nestjs/common';
import { GBooksFilter } from '../domain/services/filter';

@Injectable()
export class GoogleSearch implements SearchStrategyPort {
  private readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(
    private readonly httpService: HttpService,
    private readonly mapper: GbooksMapper,
    private readonly filter: GBooksFilter,
  ) {}

  search(query: SearchQuery): Observable<SearchResult> {
    const url = this.buildUrl(query);

    return this.httpService.get<GBooksResponse>(url).pipe(
      map((response) => {
        const data = response.data;
        const books = data.items.map((item) => {
          return this.mapper.convert(item);
        });

        const result: SearchResult = {
          results: books,
          total: data.totalItems,
          origin: 'google-books',
        };

        return result;
      }),
      switchMap((result) => this.filter.filter(of(result))),
    );
  }

  origin() {
    return 'google-books';
  }

  private buildUrl(query: SearchQuery): string {
    const { query: q, limit = 20 } = query;
    const encodedQuery = encodeURIComponent(q.author || q.title || q.isbn);
    return `${this.baseUrl}?q=${encodedQuery}&maxResults=${limit}`;
  }
}
