/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';

@Controller()
export class EcommerceController {
  constructor(private readonly appService: EcommerceService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
