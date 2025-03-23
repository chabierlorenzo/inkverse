import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookPublisher {
  @Field(() => String, { description: 'Edition isbn' })
  canonical: string;

  @Field(() => [String], { description: 'Edition limages' })
  name: string;

  @Field(() => Number, { description: 'Edition pages' })
  id: number;
}
