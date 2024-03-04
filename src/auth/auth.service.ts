import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async getUser() {
    return await this.prisma.user_kopi.findMany();
  }

  async createUser(data: { username: string; password: string }) {
    return await this.prisma.user_kopi.create({
      data,
    });
  }

  async login(data: { username: string; password: string }) {
    try {
      const findUser = await this.prisma.user_kopi.findFirst({
        where: { username: data.username },
      });
      if (findUser.password === data.password) {
        const { password, ...user } = findUser;
        // console.log(user);
        // console.log(password);
        return this.jwtService.sign(user);
      }
    } catch (error) {
      console.log('username/password yang dimasukkan salah', error);
    }
  }
}

// constructor(private readonly jwtService: JwtService) {}

// login({ username, password }: { username: string; password: string }) {
//   const findUser = users.find((user) => user.username === username);

//   if (findUser.password === password) {
//     const { password, ...user } = findUser;
//     console.log(password);

//     return this.jwtService.sign(user);
//   }
// }
