import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as process from 'node:process';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  //const configService = app.get(ConfigService);

  //await app.listen(configService.get('PORT'), () =>
  //  console.log(`BotServer запущен на порту ${configService.get('PORT')}`),
  //);
  await app.listen(process.env.PORT, () =>
    console.log(`BotServer запущен на порту ${process.env.PORT}`),
  );
}
bootstrap();
