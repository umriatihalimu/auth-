import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    console.log('ini di dalam controller Get status');
    console.log(req.user);

    return req.user;
  }
}
