import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookPublisher {
  @Field(() => String, { description: 'BookPublisher url' })
  url: string;

  @Field(() => String, { description: 'BookPublisher name' })
  name: string;

  @Field(() => Number, { description: 'BookPublisher id' })
  id: number;
}
