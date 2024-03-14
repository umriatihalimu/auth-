import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { DtoAuth } from './dto/dto.auth';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,

    private jwtService: JwtService,
  ) {}

  getHash(password: string) {
    return bcrypt.hash(password, 10);
  }

  // create akun
  async createUser(dto: DtoAuth) {
    const hash = await this.getHash(dto.password);
    const user = await this.prisma.user_kopi.create({
      data: {
        email: dto.email,
        password: hash,
      },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user_kopi.findUnique({
      where: { id },
    });
    return user;
  }

  async validateUser(dto: DtoAuth) {
    const user = await this.prisma.user_kopi.findUnique({
      where: {
        email: dto.email,
      },
    });
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
      username: dto.email,
      sub: {
        name: dto.email,
      },
    };
    return {
      user,
      backendToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
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
      username: user.email,
      sub: user.sub,
    };
    return {
      backendToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
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
