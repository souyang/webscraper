import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmazonScraper } from './scrapers/amazon.scraper';
import { ScraperFactory } from './factories/scraper.factory';
import { EcommerceService } from './ecommerce.service';
import { EcommerceController } from './ecommerce.controller';
import { TemuScraper } from './scrapers/temu.scraper';
import { WalmartScraper } from './scrapers/walmart.scraper';

@Module({
    controllers: [EcommerceController],
    providers: [
        ConfigService,
        AmazonScraper,
        TemuScraper,
        WalmartScraper,
        ScraperFactory,
        EcommerceService,
    ],
    exports: [EcommerceService],
})
export class EcommerceModule {}
