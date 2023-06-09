import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CaslModule } from 'src/auth/casl/casl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CaslModule, TypeOrmModule.forFeature([User]), JwtModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
