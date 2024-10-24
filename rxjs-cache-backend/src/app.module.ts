import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [AuthModule, ApiKeyModule, DemoModule],
})
export class AppModule {}
