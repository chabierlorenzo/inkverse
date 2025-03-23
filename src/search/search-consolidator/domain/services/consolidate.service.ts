import { Injectable } from '@nestjs/common';
import {
  SearchResult,
  SearchQuery,
  ResultOrigin,
  BookSearch,
} from 'src/search/search/domain/ports/search-strategy';
import { ConsolidateBooks } from '../ports/consolidate';
import {
  ConsolidateBook,
  ConsolidateResult,
  ConsolidatedBookEdition,
} from '../const';
import { Book, BookImage, Covers } from 'src/catalog/book/domain/interfaces';
import { Ilustrator, Translator } from 'src/catalog/author/domain/interfaces';

@Injectable()
export class ConsolidateService implements ConsolidateBooks {
  consolidate(results: SearchResult[], search: BookSearch): ConsolidateResult {
    if (!results.length) {
      return {
        search,
        books: [],
        consolidatedBook: null,
        consolidatedBookEdition: null,
        total: 0,
      };
    }

    // Primero obtenemos todos los libros con su origen
    const books = results.flatMap((result) =>
      result.books.map((book) => ({
        ...book,
        origin: result.origin,
      })),
    );

    // Filtramos los libros que coinciden exactamente con los criterios de búsqueda
    const matchingBooks = this.filterMatchingBooks(books, search);

    // Si no hay libros que coincidan exactamente, devolvemos todos los resultados sin consolidar
    if (!matchingBooks.length) {
      return {
        search,
        books,
        consolidatedBook: null,
        consolidatedBookEdition: null,
        total: books.length,
      };
    }

    const consolidatedBook = this.consolidateBook(matchingBooks);
    const consolidatedBookEdition = this.consolidateBookEdition(matchingBooks);

    return {
      search,
      books,
      consolidatedBook,
      consolidatedBookEdition,
      total: books.length,
    };
  }

  private filterMatchingBooks(
    books: Array<Book & { origin: string }>,
    search: SearchQuery['query'],
  ): Array<Book & { origin: string }> {
    return books.filter((book) => {
      // Si se busca por ISBN, debe coincidir exactamente
      if (search.isbn) {
        return (
          book.edition.isbn_13 === search.isbn ||
          book.edition.isbn_10 === search.isbn
        );
      }

      // Si se busca por título, debe coincidir exactamente (ignorando mayúsculas/minúsculas)
      if (search.title) {
        return book.title.toLowerCase() === search.title.toLowerCase();
      }

      // Si se busca por autor, debe coincidir exactamente con alguno de los autores
      if (search.author) {
        return book.authors.some(
          (author) => author.name.toLowerCase() === search.author.toLowerCase(),
        );
      }

      return false;
    });
  }

  private consolidateBook(
    books: Array<Book & { origin: string }>,
  ): ConsolidateBook {
    const origins = books.map((book) => book.origin);
    const uniqueOrigins = [...new Set(origins)] as ResultOrigin[];

    // Tomamos el primer libro como base
    const baseBook = books[0];

    return {
      ...baseBook,
      origins: uniqueOrigins,
      // Combinamos arrays únicos
      taxonomy: [...new Set(books.flatMap((book) => book.taxonomy || []))],
      tags: [...new Set(books.flatMap((book) => book.tags || []))],
      // Mantenemos la información más reciente
      createdAt: new Date().toISOString(),
    };
  }

  private consolidateBookEdition(
    books: Array<Book & { origin: string }>,
  ): ConsolidatedBookEdition {
    const editions = books.map((book) => book.edition);

    return {
      pages: editions[0].pages, // Usamos las páginas del primer libro
      lang: editions[0].lang, // Usamos el idioma del primer libro
      images: this.consolidateImages(editions.map((edition) => edition.images)),
      covers: editions[0].covers, // Usamos las cubiertas del primer libro
      translators: this.consolidateTranslators(
        editions.map((edition) => edition.translators),
      ),
      ilustrators: this.consolidateIlustrators(
        editions.map((edition) => edition.ilustrators),
      ),
      isbn_13: editions.find((edition) => edition.isbn_13)?.isbn_13,
      isbn_10: editions.find((edition) => edition.isbn_10)?.isbn_10,
      publisher: editions[0].publisher, // Usamos el editor del primer libro
      year_published: editions[0].year_published, // Usamos el año del primer libro
      info: editions[0].info, // Usamos la info del primer libro
    };
  }

  private consolidateImages(imagesArrays: BookImage[][]): BookImage[] {
    const uniqueImages = new Map<string, BookImage>();
    imagesArrays.flat().forEach((image) => {
      if (!uniqueImages.has(image.url)) {
        uniqueImages.set(image.url, image);
      }
    });
    return Array.from(uniqueImages.values());
  }

  private consolidateTranslators(
    translatorsArrays: Translator[][],
  ): Translator[] {
    const uniqueTranslators = new Map<string, Translator>();
    translatorsArrays.flat().forEach((translator) => {
      if (!uniqueTranslators.has(translator.name)) {
        uniqueTranslators.set(translator.name, translator);
      }
    });
    return Array.from(uniqueTranslators.values());
  }

  private consolidateIlustrators(
    ilustratorsArrays: Ilustrator[][],
  ): Ilustrator[] {
    const uniqueIlustrators = new Map<string, Ilustrator>();
    ilustratorsArrays.flat().forEach((ilustrator) => {
      if (!uniqueIlustrators.has(ilustrator.name)) {
        uniqueIlustrators.set(ilustrator.name, ilustrator);
      }
    });
    return Array.from(uniqueIlustrators.values());
  }
}
