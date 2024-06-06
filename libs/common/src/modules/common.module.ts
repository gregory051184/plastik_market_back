import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { CommonService } from '../services/common.service';

interface CommonModuleOptions {
  name: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {

}
