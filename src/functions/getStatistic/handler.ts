import type { APIGatewayProxyEvent } from 'aws-lambda';

import { middyfy } from '../../libs/lambda';
import { db } from '../../libs/db';

const getStatistic = async (event: APIGatewayProxyEvent) => {
    try {
        const user = event.queryStringParameters?.user;
        const period = Number(event.queryStringParameters?.period);
        let sql = 'SELECT COUNT(*) FROM orders;';
        if (user) {
            sql = sql.substring(0, sql.length - 1) + ` WHERE user='${user}';`;
        }
        if (period) {
            const endDate = new Date();
            const startDate = new Date(endDate.getTime() - period * 1000);
            sql = sql.substring(0, sql.length - 1) 
            + ` AND date BETWEEN '${startDate.toISOString().slice(0, 19).replace('T', ' ')}'`
            + ` AND '${endDate.toISOString().slice(0, 19).replace('T', ' ')}';`;
        }
        const p = new Promise(resolve => {
            db.query(sql, (_err, res) => {
                resolve(res[0]);
            }); 
        });
        const result = await p;
        
        return {
            count: result['COUNT(*)'],
        };
    } catch (error) {
        console.log(error);
    }
};

export const main = middyfy(getStatistic);