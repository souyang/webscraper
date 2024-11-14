import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseScraper } from './base.scraper';
import { Page } from 'puppeteer-core';
import { EcommerceScraper } from '../interfaces/ecommerce.interface';

@Injectable()
export class AmazonScraper extends BaseScraper implements EcommerceScraper {
    constructor(configService: ConfigService) {
        super(configService);
    }

    async getProducts(productSearchQuery: string) {
        return await this.searchForProducts(productSearchQuery);
    }

    protected getSearchUrl(): string {
        return 'https://amazon.com';
    }

    protected getSearchBoxSelector(): string {
        return '#twotabsearchtextbox';
    }

    protected getSearchButtonSelector(): string {
        return '#nav-search-submit-button';
    }

    protected getProductListSelector(): string {
        return '.s-search-results .s-card-container';
    }

    // Amazon-specific logic to extract product details
    protected async extractProductDetails(page: Page): Promise<any[]> {
        return await page.$$eval(this.getProductListSelector(), (resultItems) => {
            return resultItems.map((item) => {
                const url = item.querySelector('a')?.href || '';
                const title = item.querySelector('.s-title-instructions-style span')?.textContent?.trim() || '';
                const price = item.querySelector('.a-price .a-offscreen')?.textContent?.trim() || '';
                const rating = item.querySelector('[data-cy="reviews-ratings-slot"] .a-icon-alt')?.textContent?.trim() || '';
                const deliveryText = item.querySelector('.a-row.a-size-base.a-color-secondary.s-align-children-center')?.textContent?.trim() || '';
                const reviewCount = item.querySelector('[aria-label$="ratings"]')?.textContent?.trim() || '';
                const imageSrcSet = item.querySelector('.s-image')?.getAttribute("srcset").split(", ");
                const images = imageSrcSet?.map(item => {
                    const [url, resolution] = item.split(' ');
                    return { url, resolution };
                })
                return { url, title, price, rating, reviewCount, deliveryText, images };
            });
        });
    }
}
