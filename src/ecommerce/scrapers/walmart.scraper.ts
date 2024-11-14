import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseScraper } from './base.scraper';
import { Page } from 'puppeteer-core';
import { EcommerceScraper } from '../ecommerce.interface';

@Injectable()
export class WalmartScraper extends BaseScraper implements EcommerceScraper {
    constructor(configService: ConfigService) {
        super(configService);
    }

    async getProducts(productSearchQuery: string) {
        return await this.searchForProducts(productSearchQuery);
    }

    protected getSearchUrl(): string {
        return 'https://walmart.com';
    }

    protected getSearchBoxSelector(): string {
        return 'input[aria-label="Search"]';
    }

    protected getSearchButtonSelector(): string {
        return 'button[aria-label="Search icon"]';
    }

    protected getProductListSelector(): string {
        return 'div[data-testid="item-stack"] div[data-item-id]';
    }

    // Amazon-specific logic to extract product details
    protected async extractProductDetails(page: Page): Promise<any[]> {
        const itemSelector = this.getProductListSelector();
        const itemExists = await page.$(itemSelector) !== null;
        console.log(itemExists ? 'Items found' : 'No items found');
        const result = await page.$$eval(itemSelector, (resultItems) => {
            return resultItems.map((item) => {
                const url = item.querySelector('a')?.href || '';
                const price = item.querySelector('div[data-automation-id="product-price"] > span')?.textContent?.trim() || '';
                const title = item.querySelector('span[data-automation-id="product-title"]')?.textContent?.trim() || '';
                const imageUrl = item.querySelector('img[data-testid="productTileImage"]').getAttribute("src")?.trim() || '';
                return {url, title, price, imageUrl};
            });
        });
        return result;
    }
}
    
