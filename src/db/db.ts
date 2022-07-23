import { DataSource } from 'typeorm';

import { Order } from './entity/Order';


export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    entities: [Order],
    synchronize: true,
});