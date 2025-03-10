import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
	  limit: 50, // Limit each IP to 50 requests per window per 10 seconds
  }))
  await app.listen(3000);
}
bootstrap();
