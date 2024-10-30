import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
