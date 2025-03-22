import { Author } from 'src/catalog/author/domain/interfaces';
import { Publisher } from 'src/catalog/publisher/domain/interfaces';

interface Link {
  url: string;
  type: string;
  description: string;
  date: string;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  subtitle: string;
  taxonomy: string[];
  authors: Author[];
  lang: string;
  year_published: number;
  createdAt: string;
  affiliates: Affiliate[];
  tags: string[];
  links: Link[];
  edition: BookEdition;
}

interface Affiliate {
  name: string;
  url: string;
}

interface BookEdition {
  id: number;
  pages: number;
  lang: string;
  images: string[];
  covers: Covers;
  translators: any[];
  ilustrators: any[];
  isbn_13: string;
  edition: number;
  publisher: Publisher;
  year_published: number;
  info: Info;
}

interface Info {
  eng: string;
  esp: string;
}

interface Covers {
  front: string;
  back: string;
}
