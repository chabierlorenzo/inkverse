import { SearchStrategyPort } from 'src/search/search/domain/ports/search.port';
import { GBooksResponse } from '../domain/book';
import { HttpService } from '@nestjs/axios';
import { map, Observable, of, switchMap } from 'rxjs';

import {
  ResultOrigin,
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

    console.log('pidiendo: ', url);

    return this.httpService.get<GBooksResponse>(url).pipe(
      map((response) => {
        return this.convertGBooksToBooks(response);
      }),
      switchMap((result) => this.filter.filter(of(result))),
    );
  }

  private convertGBooksToBooks(response) {
    const data = response.data;
    const books = data.items.map((item) => {
      return this.mapper.convert(item);
    });

    const result: SearchResult = {
      books: books,
      total: data.totalItems,
      origin: 'google-books',
    };

    return result;
  }

  origin(): ResultOrigin {
    return 'google-books';
  }

  private buildUrl(query: SearchQuery): string {
    const { query: q, limit = 20 } = query;

    if (!q || (!q.author && !q.title && !q.isbn)) {
      throw new Error('Query is required');
    }

    const encodedQuery = encodeURIComponent(q.author || q.title || q.isbn);
    return `${this.baseUrl}?q=${encodedQuery}&maxResults=${limit}`;
  }
}
