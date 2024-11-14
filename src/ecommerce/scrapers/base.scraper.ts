import { ConfigService } from '@nestjs/config';
import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer-core';

@Injectable()
export abstract class BaseScraper {
    protected browser: Browser;

    constructor(protected readonly configService: ConfigService) {}
    
    //TODO: This method does not work, it will result in classId not found
    // private async setupRequestInterception(page: Page) {
    //     await page.setRequestInterception(true);
    //     page.on('request', (request) => {
    //         const resourceType = request.resourceType();
    //         if (['image', 'stylesheet', 'font'].includes(resourceType)) {
    //             request.abort();
    //         } else {
    //             request.continue();
    //         }
    //     });
    // }
    
    private handleError(error: any) {
        console.error('Web scraping failed:', error);
        if (error.name === 'TimeoutError') {
            return { statusCode: HttpStatus.REQUEST_TIMEOUT, message: 'Request timed out while scraping' };
        }
        throw new InternalServerErrorException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }

    private formatSuccessResponse(data: any) {
        if (data.length === 0) {
            return { statusCode: HttpStatus.NOT_FOUND, message: 'No products found', data: [] };
        }
        return { statusCode: HttpStatus.OK, message: 'Products retrieved successfully', data };
    }

    // Step 1: Setup for browser and page initialization
    async initBrowser(): Promise<Page> {
        this.browser = await puppeteer.connect({
            browserWSEndpoint: this.configService.getOrThrow('SBR_WS_ENDPOINT'),
        });
        const page = await this.browser.newPage();
        // await this.setupRequestInterception(page);
        page.setDefaultNavigationTimeout(60000 * 2);
        return page;
    }

    // Step 4: Abstract methods for subclasses to implement site-specific details
    protected abstract getSearchUrl(): string;
    protected abstract getSearchBoxSelector(): string;
    protected abstract getSearchButtonSelector(): string;
    protected abstract getProductListSelector(): string;
    protected abstract extractProductDetails(page: Page): Promise<any[]>;

    // Step 5: Common method to navigate and search for products
    async searchForProducts(productSearchQuery: string): Promise<any> {
        let page: Page;
        try {
            // Step 1: Initialize the browser and open a new page
            page = await this.initBrowser();
    
            // Step 2: Navigate to the search URL for the specific eCommerce website
            // This URL is defined in each subclass (e.g., 'https://amazon.com' for Amazon)
            await Promise.all([
                page.waitForNavigation(),
                page.goto(this.getSearchUrl()),
              ]);
    
            // Step 3: Type the product search query into the search box
            // The search box selector is defined in each subclass (e.g., '#twotabsearchtextbox' for Amazon)
            await page.type(this.getSearchBoxSelector(), productSearchQuery);
    
            // Step 4: Click the search button to start the product search
            // The search button selector is defined in each subclass (e.g., '#nav-search-submit-button' for Amazon)
            // Use Promise.all to wait for both the product list to load and the click action to complete
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait until the product list is rendered
                page.click(this.getSearchButtonSelector()),          // Trigger the search
            ]);
    
            // Step 5: Extract product details from the loaded page
            // The extractProductDetails method is defined in each subclass and contains the specific
            // logic needed to retrieve data such as title, price, rating, etc., for each product
            const products = await this.extractProductDetails(page);
    
            // Step 6: Format and return the response
            // This method checks if any products were found, returning a 404 status if empty,
            // or a 200 status with the product data if successful
            return this.formatSuccessResponse(products);
        } catch (error) {
            // Step 7: Handle errors by using the common error handling method
            // This method logs the error and returns an appropriate response, such as a timeout
            // status code for TimeoutError or a general 500 status for other issues
            return this.handleError(error);
        } finally {
            // Step 8: Ensure the browser is closed in the 'finally' block to release resources
            if (this.browser) await this.browser.close();
        }
    }

    
    
}
