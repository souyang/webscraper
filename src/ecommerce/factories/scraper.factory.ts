// scraper.factory.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { AmazonScraper } from '../scrapers/amazon.scraper';
import { EcommerceScraper } from '../ecommerce.interface';

@Injectable()
export class ScraperFactory {
    constructor(
        private readonly amazonScraper: AmazonScraper,
        // add more scrapers as needed
    ) {}

    getScraper(website: string): EcommerceScraper {
        switch (website.toLowerCase()) {
            case 'amazon':
                return this.amazonScraper;
            // add more cases for other eCommerce sites
            default:
                throw new NotFoundException(`Scraper for website ${website} not found`);
        }
    }
}
