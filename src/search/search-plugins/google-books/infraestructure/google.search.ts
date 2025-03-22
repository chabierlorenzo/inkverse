import { SearchStrategyPort } from 'src/search/search/domain/ports/search.port';
import { GBooksResponse } from '../domain/book';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';

import {
  SearchQuery,
  SearchResult,
} from 'src/search/search/domain/ports/search-strategy';
import { GbooksMapper } from '../domain/services/mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleSearch implements SearchStrategyPort {
  private readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(
    private readonly httpService: HttpService,
    private readonly mapper: GbooksMapper,
  ) {}

  search(query: SearchQuery): Observable<SearchResult> {
    const url = this.buildUrl(query);

    return this.httpService.get<GBooksResponse>(url).pipe(
      map((response) => {
        const data = response.data;
        const books = data.items.map((item) => {
          return this.mapper.convert(item);
        });

        return {
          results: books,
          total: data.totalItems,
          origin: 'google-books',
        };
      }),
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
