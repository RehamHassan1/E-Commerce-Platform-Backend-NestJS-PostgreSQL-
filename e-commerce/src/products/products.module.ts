/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { AdminGuard } from '../auth/guards/admin.guard';
import { Category } from 'src/category/category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Category]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || '123', 
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [ProductsController],
    providers: [ProductsService, AdminGuard],
    exports: [ProductsService],
})
export class ProductsModule { }