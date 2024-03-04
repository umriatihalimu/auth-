import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('login')
  async getUser() {
    return this.authService.getUser();
  }

  @Post('create')
  async createUser(@Body() data) {
    return await this.authService.createUser(data);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    console.log('ini didalam controller get status');

    return req.user;
  }
}
