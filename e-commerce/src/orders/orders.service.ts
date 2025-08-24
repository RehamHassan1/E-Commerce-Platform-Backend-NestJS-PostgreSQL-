/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { User } from '../users/entities/user.entity';
import { Order } from 'src/users/entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(userId: number, items: { productId: number; quantity: number }[]): Promise<Order> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const products: Product[] = [];
        let total = 0;

        for (const item of items) {
            const product = await this.productRepository.findOne({ where: { id: item.productId } });
            if (!product) throw new NotFoundException(`Product with id ${item.productId} not found`);
            if (product.stock < item.quantity) throw new Error(`Not enough stock for ${product.name}`);

            product.stock -= item.quantity;
            await this.productRepository.save(product); 

            products.push(product);
            total += Number(product.price) * item.quantity;
        }

        const order = this.orderRepository.create({ user, products, total });
        return this.orderRepository.save(order);
    }


    findAll(): Promise<Order[]> {
        return this.orderRepository.find({ relations: ['user', 'products'] });
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({ where: { id }, relations: ['user', 'products'] });
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    async updateStatus(id: number, status: string): Promise<Order> {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) throw new NotFoundException('Order not found');
        order.status = status;
        return this.orderRepository.save(order);
    }

    async remove(id: number): Promise<void> {
        await this.orderRepository.delete(id);
    }
}
