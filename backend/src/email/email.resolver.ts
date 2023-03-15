import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { SendEmailInput } from './dto/email.dto';
import { Email } from './entities/email.type';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Email)
  async sendEmail(@Args('input') input: SendEmailInput) {
    const { to, subject, htmls } = input;
    await this.emailService.sendEmail(to, subject, htmls);
    return {
      to,
      subject,
      htmls,
    };
  }
}
