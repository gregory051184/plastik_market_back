import {DataSource} from "typeorm";
import { config } from 'dotenv';
import * as process from 'node:process';

config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST_DEP,
    port: +process.env.POSTGRES_PORT_DEP,
    username: 'plastik_user', //process.env.POSTGRES_USER_DEP,
    password: process.env.POSTGRES_PASSWORD_DEP,
    database: process.env.POSTGRES_PLASTIK_DB_DEP,
    entities: ['./libs/common/src/entities/**/*.entity.ts'],
    migrations: ['./src/migrations/*.ts'],
    //ssl: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })

export default AppDataSource