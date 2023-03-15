import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Email {
  @Field()
  to: string;

  @Field()
  subject: string;

  @Field()
  htmls: string;
}
