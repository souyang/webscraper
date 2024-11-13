import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), EcommerceModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
