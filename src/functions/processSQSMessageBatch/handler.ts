import { SQSEvent } from 'aws-lambda';

import { middyfy } from '../../libs/lambda';
import { OrderRepository } from '../../db/repository/OrderRepository';
import { dataSource } from '../../db/db';

const processSQSMessageBatch = async (event: SQSEvent) => {  
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
    
    const { Records } = event;
    const values: { user: string, shop: string }[] = Records.map(({ body }) => (JSON.parse(body)));
    const result = await OrderRepository.insert(values);
    return result;

};

export const main = middyfy(processSQSMessageBatch);