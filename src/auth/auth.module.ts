import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
