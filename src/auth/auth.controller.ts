import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoAuth } from './dto/dto.auth';

import { RefreshTokenJwt } from './guards/refresh.guard';

import { UserService } from 'src/user/user.service';
import { DtoUser } from 'src/user/dto/dto.user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // buat akun
  @Post('signup')
  async signUp(@Body() dto: DtoUser) {
    return await this.userService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: DtoAuth) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshTokenJwt)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
