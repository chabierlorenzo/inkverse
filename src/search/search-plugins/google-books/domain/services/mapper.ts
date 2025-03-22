import { Book } from 'src/catalog/book/domain/interfaces';
import { GBook } from '../book';
import { SearchMapperPort } from 'src/search/search/domain/ports/mapper.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GbooksMapper implements SearchMapperPort<GBook> {
  convert(data: GBook): Book {
    return {
      title: data.volumeInfo.title,
      edition: {
        id: 0,
        pages: data.volumeInfo.pageCount,
        lang: data.volumeInfo.language,
        images: [
          {
            url: data.volumeInfo.imageLinks?.thumbnail,
            title: data.volumeInfo.title,
          },
        ],
        covers: {
          front: {
            url: data.volumeInfo.imageLinks?.thumbnail,
            title: data.volumeInfo.title,
          },
          back: {
            url: data.volumeInfo.imageLinks?.thumbnail,
            title: data.volumeInfo.title,
          },
        },
        translators: [],
        ilustrators: [],
        isbn_10: this.getIsbn('ISBN_10', data),
        isbn_13: this.getIsbn('ISBN_13', data),
        edition: 1,
        publisher: {
          name: data.volumeInfo.publisher,
          url: '',
        },
        year_published: data.volumeInfo.publishedDate,
        info: {
          en: data.volumeInfo.description,
          es: data.volumeInfo.description,
        },
      },
      authors: data.volumeInfo.authors.map((author) => {
        return {
          name: author,
          bio: '',
          born: '',
          died: '',
          image: '',
        };
      }),
      lang: data.volumeInfo.language,
      createdAt: new Date().toISOString(),
    };
  }

  private getIsbn(type: 'ISBN_13' | 'ISBN_10', data: GBook) {
    if (!data.volumeInfo.industryIdentifiers) {
      return '';
    }

    const isbn = data.volumeInfo.industryIdentifiers.find(
      (identifier) => identifier.type === type,
    );

    return isbn?.identifier || '';
  }
}
