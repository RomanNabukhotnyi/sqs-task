import { middyfy } from '../../libs/lambda';
import { db } from '../../libs/db';

const processSQSMessageBatch = async (event) => {    
    const { Records } = event;

    for (let record of Records) {
        const body = JSON.parse(record.body);
        const sql = `INSERT INTO orders (user, shop) VALUES ('${body.user}', '${body.shop}');`;
        const p = new Promise(resolve => {
            db.query(sql, (_err, res) => {
                resolve(res);
            }); 
        });
        await p;
    } 
};

export const main = middyfy(processSQSMessageBatch);