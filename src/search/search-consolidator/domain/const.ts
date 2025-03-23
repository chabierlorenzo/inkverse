import { Ilustrator, Translator } from 'src/catalog/author/domain/interfaces';
import {
  Book,
  BookImage,
  Covers,
  Info,
} from 'src/catalog/book/domain/interfaces';
import { Publisher } from 'src/catalog/publisher/domain/interfaces';
import {
  ResultOrigin,
  BookSearch,
} from 'src/search/search/domain/ports/search-strategy';

export type ConsolidateResult = {
  search: BookSearch;
  books: OriginBook[];
  consolidatedBook: Book | null;
  consolidatedBookEdition: ConsolidatedBookEdition | null;
  metadata?: Record<string, any>;
  total: number;
};

export interface OriginBook extends Book {
  origin: ResultOrigin;
}

export interface ConsolidateBook extends Book {
  origins: ResultOrigin[];
}

export interface ConsolidatedBookEdition {
  pages: number;
  lang: string;
  images: BookImage[];
  covers?: Covers;
  translators?: Translator[];
  ilustrators?: Ilustrator[];
  isbn_13?: string;
  isbn_10?: string;
  publisher: Publisher;
  year_published: string;
  info: Info;
}
