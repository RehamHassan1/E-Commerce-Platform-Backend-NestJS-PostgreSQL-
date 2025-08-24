/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Product } from '../products/product.entity';
import { User } from '../users/entities/user.entity';
import { Order } from 'src/users/entities/order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, User])],
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule { }
