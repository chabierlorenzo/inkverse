import { Injectable } from '@nestjs/common';
import { map, Observable, of, switchMap } from 'rxjs';
import { ISBN } from 'src/core/const';
import {
  ResultOrigin,
  SearchQuery,
  SearchResult,
} from 'src/search/search/domain/ports/search-strategy';
import { SearchStrategyPort } from 'src/search/search/domain/ports/search.port';
import { OPENAPI_API_URL, OPENAPI_URL } from '../domain/const';
import { HttpService } from '@nestjs/axios';
import { OpenApiBookResponse } from '../domain/book';
import { OpenApiMapper } from '../domain/services/mapper';
import { AxiosResponse } from 'axios';
import { OpenApiBookInfo } from '../domain/book-data';

@Injectable()
export class OpenApiBookSearch implements SearchStrategyPort {
  constructor(
    private readonly httpService: HttpService,
    private mapper: OpenApiMapper,
  ) {}

  origin(): ResultOrigin {
    return 'openlibrary';
  }

  search(query: SearchQuery): Observable<SearchResult> {
    const { isbn } = query.query;

    if (!isbn) {
      return of({ books: [], total: 0, origin: 'openlibrary' as ResultOrigin });
    }

    return this.searchBookByIsbn(isbn).pipe(
      switchMap((bookResponse: AxiosResponse<OpenApiBookResponse>) => {
        const bookData = bookResponse.data[`ISBN:${isbn}`];

        if (!bookData?.identifiers?.openlibrary?.[0]) {
          return of({
            books: [],
            total: 0,
            origin: 'openlibrary',
          }) as Observable<SearchResult>;
        }

        const bookId = bookData.identifiers.openlibrary[0];

        return this.getBookData(bookId).pipe(
          map((bookInfo: OpenApiBookInfo) => {
            const mappedBook = this.mapper.convert({
              info: bookInfo,
              book: bookData,
            });

            return {
              books: [mappedBook],
              total: 1,
              origin: 'openlibrary' as ResultOrigin,
            } as SearchResult;
          }),
        );
      }),
    );
  }

  /**
   * https://openlibrary.org/api/books?bibkeys=ISBN:9788445009949&jscmd=data&format=json
   * @param isbn
   */
  private searchBookByIsbn(isbn: ISBN): Observable<any> {
    const url = this.getBookByIsbnl(isbn);
    console.log('pidiendo: ', url);
    return this.httpService.get(url);
  }

  /**
   * https://openlibrary.org/books/OL35887886M.json
   * @param bookId
   */
  private getBookData(bookId: string): Observable<OpenApiBookInfo> {
    const url = this.getBookDataUrl(bookId);
    console.log('pidiendo: ', url);
    return this.httpService
      .get<OpenApiBookInfo>(url)
      .pipe(map((response: AxiosResponse<OpenApiBookInfo>) => response.data));
  }

  private getBookByIsbnl(isbn) {
    const url = new URL(OPENAPI_API_URL + '/books');
    url.searchParams.append('bibkeys', `ISBN:${isbn}`);
    url.searchParams.append('jscmd', 'data');
    url.searchParams.append('format', 'json');

    return url.href;
  }

  private getBookDataUrl(bookId: string) {
    return `${OPENAPI_URL}/books/${bookId}.json`;
  }
}
