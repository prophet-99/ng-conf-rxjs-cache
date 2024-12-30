import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return this.authService.login(user);
  }

  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(@Body() body: { refreshToken: string }) {
    const newTokens = await this.authService.refreshTokens(body.refreshToken);
    if (!newTokens)
      throw new UnauthorizedException('Refresh token inválido o expirado');

    return newTokens;
  }
}
