import { Injectable } from '@nestjs/common';
import { Observable, from, map } from 'rxjs';
import { TodosTusLibrosAdapter } from './todos-tus-libros.adapter';
import { SearchStrategyPort } from 'src/search/search/domain/ports/search.port';
import {
  ResultOrigin,
  SearchQuery,
  SearchResult,
} from 'src/search/search/domain/ports/search-strategy';
import { Book } from 'src/catalog/book/domain/interfaces';

@Injectable()
export class TodosTusLibrosService implements SearchStrategyPort {
  constructor(private readonly adapter: TodosTusLibrosAdapter) {}

  origin(): ResultOrigin {
    return 'todostuslibros';
  }

  search(bookSearch: SearchQuery): Observable<SearchResult> {
    const { title, author, isbn } = bookSearch.query;

    const q = title ? title : author ? author : isbn ? isbn : '';

    const search = `https://www.todostuslibros.com/busquedas?keyword=${q}`;
    return from(this.adapter.get(search)).pipe(
      map((books: Book[]) => ({
        books,
        total: books.length,
      })),
    );
  }
}
