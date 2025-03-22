import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Book } from 'src/catalog/book/domain/interfaces';
import { FilterStrategyPort } from 'src/search/search/domain/ports/filter.port';
import { SearchResult } from 'src/search/search/domain/ports/search-strategy';

@Injectable()
export class GBooksFilter implements FilterStrategyPort {
  filter(result: Observable<SearchResult>): Observable<SearchResult> {
    return result.pipe(
      map((res) => {
        res.results = res.results.filter(
          (book: Book) => book.edition.isbn_10 || book.edition.isbn_13,
        );
        return res;
      }),
    );
  }
}
