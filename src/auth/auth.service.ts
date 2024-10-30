import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, sen: string,): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(email);
    if (user?.senha !== sen) {
      throw new UnauthorizedException();

    }
    const payload = { sub: user.id, email: user.email };
    var token = await this.jwtService.signAsync(payload)
    return {
      accessToken: await this.jwtService.signAsync(payload),

    };
  }
}