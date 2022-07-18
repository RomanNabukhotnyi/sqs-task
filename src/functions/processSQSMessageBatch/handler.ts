import { SQSEvent } from 'aws-lambda';

import { middyfy } from '../../libs/lambda';
import { db } from '../../libs/db';

const processSQSMessageBatch = async (event: SQSEvent) => {    
    const { Records } = event;

    const sql = 'INSERT INTO orders (user, shop) VALUES ?;';
    const values = Records.map(({ body }) => ([JSON.parse(body).user, JSON.parse(body).shop]));
    const p = new Promise(resolve => {
        db.query(sql, [values], (_err, res) => {
            resolve(res);
        }); 
    });
    await p;
};

export const main = middyfy(processSQSMessageBatch);