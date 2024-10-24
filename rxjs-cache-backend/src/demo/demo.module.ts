import { Module } from '@nestjs/common';

import { DemoController } from './demo.controller';
import { ApiKeyModule } from '../api-key/api-key.module';
import { AuthModule } from '../auth/auth.module';
import { ApiKeyGuard } from '../api-key/api-key.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [ApiKeyModule, AuthModule],
  controllers: [DemoController],
  providers: [ApiKeyGuard, JwtAuthGuard],
})
export class DemoModule {}
