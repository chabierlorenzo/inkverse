import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookCovers {
  @Field(() => String, { description: 'Book front image' })
  front: string;

  @Field(() => String, { description: 'Book back image' })
  back: string;
}
