import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DtoAuth } from './dto/dto.auth';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: DtoAuth) {
    const user = await this.userService.findUserByEmail(dto.username);
    // console.log(user);

    if (!user) {
      throw new NotFoundException('Akun User Tidak Ada');
    }

    const comparing = await bcrypt.compare(dto.password, user.password);

    if (user && comparing) {
      const { password, ...result } = user;
      console.log(password);

      return result;
    }
    console.log('Password tidak cocok!');
    throw new UnauthorizedException('password salah');
  }

  async login(dto: DtoAuth) {
    const user = await this.validateUser(dto);
    const payload = {
      username: dto.username,
      sub: {
        name: dto.username,
      },
    };
    return {
      user,
      backendToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '60s',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
      },
    };
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };
    return {
      backendToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '60s',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
      },
    };
  }
}
