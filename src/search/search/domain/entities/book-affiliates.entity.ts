import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookAffiliates {
  @Field(() => String, { description: 'Book link name' })
  name: string;

  @Field(() => String, { description: 'Book link url' })
  url: string;
}
