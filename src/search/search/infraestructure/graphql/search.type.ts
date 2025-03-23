import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from '../../domain/entities/book.entity';

@ObjectType()
export class SearchResult {
  @Field(() => [Book])
  books: Book[];
}

@ObjectType()
export class SearchResponse {
  @Field(() => [SearchResult])
  results: SearchResult[];
}
