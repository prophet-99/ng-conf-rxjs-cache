import { Controller, Get } from '@nestjs/common';

import { ApiKeyService } from './api-key.service';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Get()
  getApiKey() {
    return { apiKey: this.apiKeyService.getApiKey() };
  }
}
