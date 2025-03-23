import { Field, ObjectType } from '@nestjs/graphql';
import { ResultOrigin } from '../../domain/ports/search-strategy';

@ObjectType()
export class BookImageGQ {
  @Field()
  url: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  width?: number;

  @Field({ nullable: true })
  height?: number;
}

@ObjectType()
export class Info {
  @Field()
  es: string;

  @Field()
  en: string;
}

@ObjectType()
export class CoversGQ {
  @Field(() => BookImageGQ)
  front: BookImageGQ;

  @Field(() => BookImageGQ)
  back: BookImageGQ;
}

@ObjectType()
export class PublisherGQ {
  @Field()
  name: string;

  @Field()
  url: string;
}

@ObjectType()
export class BookEditionGQ {
  @Field()
  pages: number;

  @Field()
  lang: string;

  @Field(() => [BookImageGQ])
  images: BookImageGQ[];

  @Field(() => CoversGQ, { nullable: true })
  covers?: CoversGQ;

  @Field(() => [TranslatorGQ])
  translators?: TranslatorGQ[];

  @Field(() => [IlustratorGQ])
  ilustrators?: IlustratorGQ[];

  @Field({ nullable: true })
  isbn_13?: string;

  @Field({ nullable: true })
  isbn_10?: string;

  @Field()
  publisher: PublisherGQ;

  @Field()
  year_published: string;

  @Field(() => Info)
  info: Info;
}

@ObjectType()
export class AuthorGQ {
  @Field()
  name?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}

@ObjectType()
export class TranslatorGQ {
  @Field()
  name?: string;

  @Field({ nullable: true })
  bio?: string;
}

@ObjectType()
export class IlustratorGQ {
  @Field()
  name?: string;

  @Field({ nullable: true })
  bio?: string;
}

@ObjectType()
export class BookGQ {
  @Field()
  title: string;

  @Field(() => [AuthorGQ])
  authors: AuthorGQ[];

  @Field(() => BookEditionGQ)
  edition: BookEditionGQ;

  @Field(() => [String], { nullable: true })
  taxonomy?: string[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field()
  createdAt: string;

  @Field(() => String)
  origin?: ResultOrigin;
}

@ObjectType()
export class BookSearchGQ {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  isbn?: string;
}

@ObjectType()
export class SearchResultGQ {
  @Field(() => BookSearchGQ)
  search: BookSearchGQ;

  @Field(() => [BookGQ])
  books: BookGQ[];

  @Field()
  total: number;

  @Field(() => BookGQ, { nullable: true })
  consolidatedBook: BookGQ | null;

  @Field(() => BookEditionGQ, { nullable: true })
  consolidatedBookEdition: BookEditionGQ | null;
}
