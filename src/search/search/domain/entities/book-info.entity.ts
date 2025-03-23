import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookInfo {
  @Field(() => String, { description: 'Book info esp' })
  esp: string;

  @Field(() => String, { description: 'Book info eng' })
  eng: string;
}
