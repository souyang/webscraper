import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseScraper } from './base.scraper';
import { Page } from 'puppeteer-core';
import { EcommerceScraper } from '../ecommerce.interface';

@Injectable()
export class TemuScraper extends BaseScraper implements EcommerceScraper {
    constructor(configService: ConfigService) {
        super(configService);
    }

    async getProducts(productSearchQuery: string) {
        return await this.searchForProducts(productSearchQuery);
    }

    protected getSearchUrl(): string {
        return 'https://temu.com';
    }

    protected getSearchBoxSelector(): string {
        return '#searchInput';
    }

    protected getSearchButtonSelector(): string {
        return 'div[aria-label="Submit search"]';
    }

    protected getProductListSelector(): string {
        return '.js-search-goodsList > .autoFitList > div';
    }

    // Amazon-specific logic to extract product details
    protected async extractProductDetails(page: Page): Promise<any[]> {
        return await page.$$eval(this.getProductListSelector(), (resultItems) => {
            return resultItems.map((item) => {
                const url = item.querySelector('div[data-tooltip^="goodName"] a')?.getAttribute('href') || '';
                const title = item.querySelector('.goods-image-container-external')?.getAttribute('data-tooltip-title')?.trim() || '';
                const price = item.querySelector('div[data-type="price"][role="link"]')?.getAttribute('aria-label') || ''
                const saleTips = item.querySelector('div[data-type="saleTips"][role="link"]')?.getAttribute('aria-label') || '';
                const imagePartialUrl = item.querySelector('div[data-tooltip^="goodsImage"] img')?.getAttribute("src") || '';
                const imageUrl = imagePartialUrl ? this.getSearchUrl() + imagePartialUrl : '';
                return { url, title, price, saleTips, imageUrl };
            });
        });
    }
}
