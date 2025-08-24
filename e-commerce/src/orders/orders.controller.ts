/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @UseGuards(AdminGuard)
    getAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.ordersService.findOne(id);
    }

    @Post()
    create(@Body() body: { userId: number; items: { productId: number; quantity: number }[] }) {
        return this.ordersService.create(body.userId, body.items);
    }


    @Put(':id/status')
    @UseGuards(AdminGuard)
    updateStatus(@Param('id') id: number, @Body() body: { status: string }) {
        return this.ordersService.updateStatus(id, body.status);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    remove(@Param('id') id: number) {
        return this.ordersService.remove(id);
    }
}
