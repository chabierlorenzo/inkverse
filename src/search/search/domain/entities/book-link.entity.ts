import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookLink {
  @Field(() => String, { description: 'Book link name' })
  name: string;

  @Field(() => String, { description: 'Book link url' })
  url: string;

  @Field(() => String, { description: 'Book link type' })
  type: string;

  @Field(() => String, { description: 'Book link description' })
  description: string;

  @Field(() => String, { description: 'Book link date' })
  date: string;
}
