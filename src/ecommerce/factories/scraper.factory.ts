// scraper.factory.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { AmazonScraper } from '../scrapers/amazon.scraper';
import { EcommerceScraper } from '../interfaces/ecommerce.interface';
import { TemuScraper } from '../scrapers/temu.scraper';
import { WalmartScraper } from '../scrapers/walmart.scraper';

@Injectable()
export class ScraperFactory {
    constructor(
        private readonly amazonScraper: AmazonScraper,
        private readonly temuScraper: TemuScraper,
        private readonly walmartScraper: WalmartScraper
        // add more scrapers as needed
    ) {}

    getScraper(website: string): EcommerceScraper {
        switch (website.toLowerCase()) {
            case 'amazon':
                return this.amazonScraper;
            case 'temu':
                return this.temuScraper;
            case 'walmart':
                return this.walmartScraper;
            // add more cases for other eCommerce sites
            default:
                throw new NotFoundException(`Scraper for website ${website} not found`);
        }
    }
}
