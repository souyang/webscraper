import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EcommerceModule } from './ecommerce/ecommerce.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), EcommerceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
