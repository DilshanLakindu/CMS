import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendEmailInput {
  @Field()
  to: string;

  // @Field()
  // subject: string;

  // @Field()
  // htmls: string;
}
