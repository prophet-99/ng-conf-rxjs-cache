import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiKeyGuard } from '../api-key/api-key.guard';

@Controller('demo')
export class DemoController {
  @UseGuards(JwtAuthGuard, ApiKeyGuard)
  @Get()
  helloWorld(@Req() request: Request) {
    const apiKey = request.headers['x-api-key'] as string;
    return {
      message: 'Hello World',
      apiKeyUsed: apiKey,
    };
  }
}
