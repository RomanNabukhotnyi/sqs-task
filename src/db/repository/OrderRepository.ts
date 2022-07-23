import { Raw } from 'typeorm';

import { dataSource } from '../db';
import { Order } from '../entity/Order';

export const OrderRepository = dataSource.getRepository(Order).extend({
    async getCountByPeriod(period: number, user?: string) {
        const date = new Date(new Date().getTime() - period * 1000);
        if (user && period) {
            const count = await this.countBy({
                user,
                date: Raw(alias => `${alias} > :date`, { date }),
            });
            return count;
        }
        const count = await this.countBy({ date: Raw(alias => `${alias} > :date`, { date }) });
        return count;
    },
});