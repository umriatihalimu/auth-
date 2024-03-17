import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { DtoUser } from './dto/dto.user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number) {
    const user = await this.prisma.user_kopi.findUnique({
      where: { id },
    });
    return user;
  }

  getHash(password: string) {
    return bcrypt.hash(password, 10);
  }

  // create akun
  async createUser(dto: DtoUser) {
    const hash = await this.getHash(dto.password);
    const user = await this.prisma.user_kopi.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hash,
      },
    });
    return user;
  }

  // agar username bisa login pake email
  async findUserByEmail(email: string) {
    return await this.prisma.user_kopi.findUnique({
      where: {
        email: email,
      },
    });
  }
}
