import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, sen: string,): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(email);
    console.log(bcrypt.compareSync(sen,user.senha))
    if (bcrypt.compareSync(sen,user.senha)) {
      const payload = { sub: user.id, email: user.email };
      var token = await this.jwtService.signAsync(payload)
      return {
        accessToken: await this.jwtService.signAsync(payload),
  
      };
    }
    throw new UnauthorizedException(
      "Usuario ou senha incorretos"
    );
  }
}