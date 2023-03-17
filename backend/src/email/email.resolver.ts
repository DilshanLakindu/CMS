import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { SendEmailInput } from './dto/email.dto';
import { Email } from './entities/email.type';
import { JwtService } from '@nestjs/jwt';
import { jwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Email)
  async sendEmail(@Args('input') input: SendEmailInput) {
    const { to } = input;

    await this.emailService.sendEmail(to);
    return {
      to,
    };
  }
}
