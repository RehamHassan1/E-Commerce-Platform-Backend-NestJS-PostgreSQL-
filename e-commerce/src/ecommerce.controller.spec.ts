/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceService } from './ecommerce.service';

describe('EcommerceController', () => {
  let appController: EcommerceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EcommerceController],
      providers: [EcommerceService],
    }).compile();

    appController = app.get<EcommerceController>(EcommerceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
