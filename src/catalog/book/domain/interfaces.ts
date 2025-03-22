import {
  Author,
  Ilustrator,
  Translator,
} from 'src/catalog/author/domain/interfaces';
import { Publisher } from 'src/catalog/publisher/domain/interfaces';
import { ISBN_10, ISBN_13 } from '../../../core/const';

interface Link {
  url: string;
  type: string;
  description: string;
  date: string;
  name: string;
}

export interface Book {
  id?: number;
  title: string;
  subtitle?: string;
  edition: BookEdition;
  taxonomy?: string[];
  authors: Author[];
  lang: string;
  year_published?: number;
  createdAt: string;
  affiliates?: Affiliate[];
  tags?: string[];
  links?: Link[];
}

type BookImage = {
  url: string; // URL de la imagen
  title?: string; // Título asociado a la imagen
};

interface Affiliate {
  name: string;
  url: string;
}

export interface BookEdition {
  id: number;
  pages: number;
  lang: string;
  images: BookImage[];
  covers: Covers;
  translators: Translator[];
  ilustrators: Ilustrator[];
  isbn_13?: string;
  isbn_10: string;
  edition: number;
  publisher: Publisher;
  year_published: string;
  info: Info;
  publisedDate?: Date;
}

interface Info {
  en: string;
  es: string;
}

interface Covers {
  front: BookImage;
  back: BookImage;
}
