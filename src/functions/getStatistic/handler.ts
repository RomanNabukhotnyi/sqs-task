import type { APIGatewayProxyEvent } from 'aws-lambda';

import { middyfy } from '../../libs/lambda';
import { OrderRepository } from '../../db/repository/OrderRepository';
import { dataSource } from '../../db/db';

const getStatistic = async (event: APIGatewayProxyEvent) => {
    if (!dataSource.isInitialized) {
        await dataSource
            .initialize()
            .then(() => {
                console.log('Data Source has been initialized!');
            })
            .catch((err) => {
                console.error('Error during Data Source initialization:', err);
            });
    }
    const user = event.queryStringParameters?.user;
    const period = Number(event.queryStringParameters?.period);
    let count = 0;
    if (user && period) {
        count = await OrderRepository.getCountByPeriod(period, user);
    } else if (user) {
        count = await OrderRepository.countBy({ user });
    } else if (period) {
        count = await OrderRepository.getCountByPeriod(period);
    } else {
        count = await OrderRepository.count();
    }
    return {
        count,
    };
};

export const main = middyfy(getStatistic);