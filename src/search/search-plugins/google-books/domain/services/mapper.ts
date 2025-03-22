import { Book } from 'src/catalog/book/domain/interfaces';
import { Gbook } from '../book';

export class GbooksMapper {
  convert(data: Gbook): Book {
    return {
      title: data.volumeInfo.title,
      edition: {
        id: 0,
        pages: data.volumeInfo.pageCount,
        lang: data.volumeInfo.language,
        images: [
          {
            url: data.volumeInfo.imageLinks.thumbnail,
            title: data.volumeInfo.title,
          },
        ],
        covers: {
          front: {
            url: data.volumeInfo.imageLinks.thumbnail,
            title: data.volumeInfo.title,
          },
          back: {
            url: data.volumeInfo.imageLinks.thumbnail,
            title: data.volumeInfo.title,
          },
        },
        translators: [],
        ilustrators: [],
        isbn_10: data.volumeInfo.industryIdentifiers[0].identifier,
        isbn_13: data.volumeInfo.industryIdentifiers[1].identifier,
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
}
