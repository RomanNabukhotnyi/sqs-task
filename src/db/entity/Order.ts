import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
        id?: number;
    
    @Column()
        user: string;

    @Column()
        shop: string;

    @CreateDateColumn()
        date?: Date;
}