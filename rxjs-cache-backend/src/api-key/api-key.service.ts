import { Injectable } from '@nestjs/common';

interface ApiKey {
  key: string;
  expiresAt: number;
}

@Injectable()
export class ApiKeyService {
  private apiKeys: ApiKey[] = [];

  constructor() {
    this.generateApiKey();
  }

  generateApiKey() {
    const newApiKey = Math.random().toString(36).substring(2);
    // * Validez de 10 segundos a 30 días
    // const validityPeriod = Math.floor(Math.random() * 2592000) + 10;
    // * Validez de 10 segundos a 60 segundos
    const validityPeriod = Math.floor(Math.random() * 50) + 10;
    const expiresAt = Date.now() + validityPeriod * 1000;

    this.apiKeys.push({ key: newApiKey, expiresAt });
  }

  getApiKey() {
    this.generateApiKey();
    return this.apiKeys[this.apiKeys.length - 1].key;
  }

  isApiKeyValid(apiKey: string): boolean {
    const foundKey = this.apiKeys.find((keyObj) => keyObj.key === apiKey);
    return foundKey ? Date.now() <= foundKey.expiresAt : false;
  }

  getStoredApiKeys() {
    return this.apiKeys;
  }
}
