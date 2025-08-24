/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productsRepository.find({
            relations: ['categoryRelation'],
        });
    }

    async findAllFormatted() {
        const products = await this.productsRepository.find({
            relations: ['categoryRelation'],
        });

        return products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            image: product.image,
            adminEmail: product.adminEmail,
            category: product.categoryRelation?.name || product.category || 'Uncategorized',
            categoryId: product.categoryId
        }));
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['categoryRelation'],
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }
    async findOneFormatted(id: number) {
        const product = await this.findOne(id);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            image: product.image,
            adminEmail: product.adminEmail,
            category: product.categoryRelation?.name || product.category || 'Uncategorized',
            categoryId: product.categoryId
        };
    }

    async findByCategoryName(categoryName: string) {
        const products = await this.productsRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.categoryRelation', 'category')
            .where('category.name = :categoryName', { categoryName })
            .orWhere('product.category = :categoryName', { categoryName }) 
            .getMany();

        return products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            image: product.image,
            adminEmail: product.adminEmail,
            category: product.categoryRelation?.name || product.category || 'Uncategorized',
            categoryId: product.categoryId
        }));
    }

    async create(productData: Partial<Product>): Promise<Product> {
        if (productData.categoryId) {
            const category = await this.categoriesRepository.findOne({
                where: { id: productData.categoryId }
            });
            if (category) {
                productData.category = category.name;
            }
        }

        const product = this.productsRepository.create(productData);
        return this.productsRepository.save(product);
    }

    async update(id: number, productData: Partial<Product>): Promise<Product> {
        const product = await this.findOne(id);

        if (productData.categoryId) {
            const category = await this.categoriesRepository.findOne({
                where: { id: productData.categoryId }
            });
            if (category) {
                productData.category = category.name;
            }
        }

        Object.assign(product, productData);
        return this.productsRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.productsRepository.remove(product);
    }

    async findByCategory(categoryId: number): Promise<Product[]> {
        return this.productsRepository.find({
            where: { categoryId },
            relations: ['categoryRelation'],
        });
    }
}