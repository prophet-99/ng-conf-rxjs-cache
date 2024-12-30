import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private _refreshTokens: Map<string, string> = new Map();

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (username === 'admin' && password === '1234') {
      return { username };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this._generateRefreshToken();

    this._saveRefreshToken(user.username, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    const username = this.validateRefreshToken(refreshToken);

    if (!username) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const payload = { username };
    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const newRefreshToken = this._generateRefreshToken();

    this._saveRefreshToken(username, newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  private _generateRefreshToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private _saveRefreshToken(username: string, refreshToken: string): void {
    this._refreshTokens.set(username, refreshToken);
  }

  private validateRefreshToken(refreshToken: string): string | null {
    for (const [username, storedToken] of this._refreshTokens.entries()) {
      if (storedToken === refreshToken) {
        return username;
      }
    }
    return null;
  }
}
