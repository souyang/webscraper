import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';

@Controller('ecommerce')
export class EcommerceController {
    constructor(private readonly ecommerceService: EcommerceService) {}

    @Get('products')
    async getProducts(
        @Query('website') website: string = 'amazon',
        @Query('query') productSearchQuery: string,
    ) {
        if (!website || !productSearchQuery) {
            throw new HttpException(
                { statusCode: HttpStatus.BAD_REQUEST, message: 'Missing website or query parameter' },
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            const response = await this.ecommerceService.getProducts(website, productSearchQuery);
            return response;
        } catch (error) {
            throw new HttpException(
                { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
