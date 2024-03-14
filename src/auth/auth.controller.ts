import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoAuth } from './dto/dto.auth';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshTokenJwt } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // buat akun
  @Post('signup')
  async signUp(@Body() dto: DtoAuth) {
    return await this.authService.createUser(dto);
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

  @UseGuards(JwtGuard) //middleware untuk endpoint
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.authService.getUserById(id);
  }
}
