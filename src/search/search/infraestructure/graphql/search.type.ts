import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class BookImage {
  @Field()
  url: string;

  @Field({ nullable: true })
  title?: string;
}

@ObjectType()
class Publisher {
  @Field()
  name: string;

  @Field()
  url: string;
}
@ObjectType()
class Info {
  @Field()
  en: string;

  @Field()
  es: string;
}
@ObjectType()
class BookEdition {
  @Field()
  id: number;

  @Field()
  pages: number;

  @Field()
  lang: string;

  @Field(() => [BookImage])
  images: BookImage[];

  @Field(() => BookImage)
  front: BookImage;

  @Field(() => BookImage)
  back: BookImage;

  @Field(() => [String])
  translators: string[];

  @Field(() => [String])
  ilustrators: string[];

  @Field({ nullable: true })
  isbn_13?: string;

  @Field()
  isbn_10: string;

  @Field()
  edition: number;

  @Field(() => Publisher)
  publisher: Publisher;

  @Field()
  year_published: string;

  @Field(() => Info)
  info: Info;
}

@ObjectType()
class Author {
  @Field()
  name: string;

  @Field()
  bio: string;

  @Field()
  born: string;

  @Field()
  died: string;

  @Field()
  image: string;
}

@ObjectType()
export class BookType {
  @Field({ nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field(() => BookEdition)
  edition: BookEdition;

  @Field(() => [String], { nullable: true })
  taxonomy?: string[];

  @Field(() => [Author])
  authors: Author[];

  @Field()
  lang: string;

  @Field({ nullable: true })
  year_published?: number;

  @Field()
  createdAt: string;
}

@ObjectType()
export class SearchResultGQ {
  @Field(() => [BookType])
  books: BookType[];

  @Field()
  total: number;

  @Field()
  origin: string;
}
