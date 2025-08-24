/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { EcommerceModule } from './ecommerce.module';

async function bootstrap() {
  const app = await NestFactory.create(EcommerceModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(5001); 
  console.log(`********NestJS backend running at http://localhost:5001`);
}
bootstrap();
