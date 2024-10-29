
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, sen: string,): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (user?.senha !== sen) {
      throw new UnauthorizedException();

    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      
    };
  }
}
