/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceService } from './ecommerce.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { Order } from './users/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { UsersModule } from './profile/users.module';
import { Category } from './category/category.entity';
import { CategoriesModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5000,
      username: 'postgres',
      password: '123',
      database: 'ecommerce',
      entities: [User,Product,Order,Category],
      synchronize: true, 
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || '123',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    UsersModule,
  ],
  controllers: [EcommerceController],
  providers: [EcommerceService],
})
export class EcommerceModule { }
