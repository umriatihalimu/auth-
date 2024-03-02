import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
  {
    id: 1,
    username: 'umi',
    password: 'abc',
  },
  {
    id: 2,
    username: 'umi2',
    password: 'abc2',
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login({ username, password }: { username: string; password: string }) {
    const findUser = users.find((user) => user.username === username);

    if (findUser.password === password) {
      const { password, ...user } = findUser;
      console.log(password);

      return this.jwtService.sign(user);
    }
  }
}
