/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { JwtAuthGuard } from 'src/auth/JWT/jwt.auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async findAll(@Query('category') category?: string) {
        if (category) {
            return this.productsService.findByCategoryName(category);
        }
        return this.productsService.findAllFormatted();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.productsService.findOneFormatted(+id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() productData: Partial<Product>): Promise<Product> {
        return this.productsService.create(productData);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: number, @Body() productData: Partial<Product>): Promise<Product> {
        return this.productsService.update(+id, productData);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: number): Promise<void> {
        return this.productsService.remove(+id);
    }

    @Get('category/:categoryId')
    @UseGuards(JwtAuthGuard)
    findByCategory(@Param('categoryId') categoryId: number): Promise<Product[]> {
        return this.productsService.findByCategory(+categoryId);
    }
}