import { Injectable } from '@nestjs/common';
import { ScraperFactory } from './factories/scraper.factory';

@Injectable()
export class EcommerceService {
    constructor(private readonly scraperFactory: ScraperFactory) {}

    async getProducts(website: string, productSearchQuery: string) {
        const scraper = this.scraperFactory.getScraper(website);
        return await scraper.getProducts(productSearchQuery);
    }
}


