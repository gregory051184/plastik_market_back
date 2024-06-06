import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as process from 'node:process';

config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  /*host: 'dpg-cpfjk8n109ks73blre7g-a.frankfurt-postgres.render.com', //configService.get<string>('POSTGRES_HOST_DEP'),
  port: 5432, //+configService.get<number>('POSTGRES_PORT_DEP'),
  username: 'plastik_market_db_user', //configService.get<string>('POSTGRES_USERS_DEP'),
  password: 'ldfHBc2Wxjmibitx642cab1sa7N92lDm', //configService.get<string>('POSTGRES_PASSWORD_DEP'),
  database: 'plastik_market_db', //configService.get<string>('POSTGRES_PLASTIK_DB_DEP'),*/
  host: process.env.POSTGRES_HOST_DEP,
  port: +process.env.POSTGRES_PORT_DEP,
  username: 'plastik_market_db_user', //process.env.POSTGRES_USER_DEP,
  password: process.env.POSTGRES_PASSWORD_DEP,
  database: process.env.POSTGRES_PLASTIK_DB_DEP,
  entities: ['./libs/common/src/entities/**/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
  ssl: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
