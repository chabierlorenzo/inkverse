import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookLink } from './book-link.entity';

import { BookAffiliates } from './book-affiliates.entity';
import { BookEdition } from './book-edition.entity';

@ObjectType()
export class Book {
  @Field(() => Int, { description: 'Book id' })
  id: number;

  @Field(() => String, { description: 'Book title' })
  title: string;

  @Field(() => String, { description: 'Book subtitle' })
  subtitle: string;

  @Field(() => [String], { description: 'Books author' })
  authors: number[];

  @Field(() => [String], { description: 'Books taxonomies' })
  taxonomy: string[];

  @Field(() => String, { description: 'Book lang' })
  lang: string;

  @Field(() => [String], { description: 'Book tipos' })
  types: string[];

  @Field(() => String, { description: 'Book year published' })
  year_published: string;

  @Field(() => [String], { description: 'Book tags' })
  tags: string[];

  @Field(() => [BookLink], { description: 'Book tags' })
  links: BookLink[];

  @Field(() => BookEdition, { description: 'Book edition' })
  edition: number;

  @Field(() => [BookAffiliates], { description: 'Book edition' })
  affiliates: BookAffiliates;

  @Field(() => String, { description: 'Book creation' })
  created_at: string;
}
