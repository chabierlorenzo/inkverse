import { Injectable } from '@nestjs/common';
import { SearchMapperPort } from 'src/search/search/domain/ports/mapper.port';
import { OpenApiBook } from '../book';
import { Book } from 'src/catalog/book/domain/interfaces';
import { OpenApiBookImage } from './book-image';
import { OpenApiBookInfo } from '../book-data';
import { LANGUAGES } from 'src/core/const';
import { Author } from 'src/catalog/author/domain/interfaces';

@Injectable()
export class OpenApiMapper implements SearchMapperPort<OpenApiBook> {
  constructor(private image: OpenApiBookImage) {}

  convert(data: OpenApiBook): Book {
    const info = data.info;
    return {
      title: info.title,
      edition: {
        id: 0,
        pages: info.number_of_pages,
        lang: info.languages[0].key,
        images: [
          {
            url: this.image.getBig(this.getIsbn(info)),
          },
        ],
        translators: [],
        ilustrators: [],
        isbn_10: this.getIsbn10(info),
        isbn_13: this.getIsbn13(info),
        edition: 1,
        publisher: {
          name: this.getPublisher(info),
          url: '',
        },
        year_published: info.publish_date,
        info: {
          en: info.description.value,
          es: info.description.value,
        },
      },
      authors: this.generateAuthorList(data),
      lang: info.languages[0].key as keyof typeof LANGUAGES,
      createdAt: new Date().toISOString(),
    };
  }

  private getPublisher(info: OpenApiBookInfo): string {
    if (!info.publishers) {
      return '';
    }

    return info.publishers[0];
  }

  private getIsbn13(info: OpenApiBookInfo): string {
    if (info.isbn_13) {
      return info.isbn_13['0'];
    }

    return '';
  }

  private getIsbn10(info: OpenApiBookInfo): string {
    if (info.isbn_10) {
      return info.isbn_10['0'];
    }

    return '';
  }

  private getIsbn(info: OpenApiBookInfo): string {
    if (info.isbn_13) {
      return info.isbn_13['0'];
    } else if (info.isbn_10) {
      return info.isbn_10['0'];
    }
    return '';
  }

  generateAuthorList(data: OpenApiBook): Author[] {
    return data.book.authors.map((author) => {
      return { name: author.name };
    });
  }
}
