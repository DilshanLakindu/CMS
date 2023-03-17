import { Module } from '@nestjs/common';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my_secret_key',
    }),
  ],
  providers: [EmailResolver, EmailService],
})
export class EmailModule {}
