import { OpenApiBookInfo } from './book-data';

type ISBN = `ISBN:${string}`;

export type OpenApiBookResponse = Record<ISBN, BookData>;

export interface BookData {
  url: string;
  key: string;
  title: string;
  authors: Author[];
  number_of_pages: number;
  weight: string;
  identifiers: Identifiers;
  publishers: Publisher[];
  publish_places: Publisher[];
  publish_date: string;
  subjects: Author[];
  subject_places: Author[];
  cover: Cover;
}

interface Cover {
  small: string;
  medium: string;
  large: string;
}

interface Publisher {
  name: string;
}

interface Identifiers {
  isbn_13: string[];
  openlibrary: string[];
}

interface Author {
  url: string;
  name: string;
}

export interface OpenApiBook {
  book: BookData;
  info: OpenApiBookInfo;
}
