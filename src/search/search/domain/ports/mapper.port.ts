import { Book } from 'src/catalog/book/domain/interfaces';

export type SearchMapperPort<T> = {
  convert(data: T): Book;
};
