import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import * as fs from "fs";

/*const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key'),
  cert: fs.readFileSync('./secrets/cert.crt'),
};*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.setGlobalPrefix("api");

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'), () =>
      console.log(`BotServer запущен на порту ${configService.get('PORT')}`));
}
bootstrap();
