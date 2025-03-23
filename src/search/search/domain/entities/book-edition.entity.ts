import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookInfo } from './book-info.entity';
import { BookPublisher } from './book-publisher.entity';

@ObjectType()
class Cover {
  @Field(() => String)
  front: string;

  @Field(() => String)
  back: string;
}

@ObjectType()
export class BookEdition {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  pages: number;

  @Field(() => String)
  lang: string;

  @Field(() => [String])
  images: string[];

  @Field(() => Cover)
  covers: Cover;

  @Field(() => [String])
  translators: string[];

  @Field(() => [String])
  ilustrators: string[];

  @Field(() => String)
  isbn_13: string;

  @Field(() => Int)
  edition: number;

  @Field(() => Int)
  year_published: number;

  @Field(() => String, { nullable: true })
  esp?: string;

  @Field(() => String, { nullable: true })
  eng?: string;

  @Field(() => Date, { nullable: true })
  created_at?: Date;

  @Field(() => Date, { nullable: true })
  updated_at?: Date;

  @Field(() => BookInfo, { description: 'Edition info' })
  info: BookInfo;

  @Field(() => BookPublisher, { description: 'Edition publisher' })
  publisher: BookPublisher;
}
