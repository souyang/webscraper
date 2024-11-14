export interface EcommerceScraper {
    getProducts(productSearchQuery: string): Promise<any>;
}
