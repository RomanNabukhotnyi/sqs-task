import * as AWS from 'aws-sdk';

import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import schema from './schema';

const sqs = new AWS.SQS();

const placeOrder: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const { user, shop } = event.body;
    const result = await sqs.sendMessage({
        MessageBody: JSON.stringify({
            user,
            shop,
        }),
        QueueUrl: process.env.SQS_URL,
    }).promise();
    return {
        result,
    };
};

export const main = middyfy(placeOrder, schema);