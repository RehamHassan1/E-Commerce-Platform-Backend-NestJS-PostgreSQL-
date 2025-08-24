/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from 'typeorm';
import { Order } from "./order.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column({ unique: true })
    email: string;
    
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @Column()
    password: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ default: "user" })
    role: string;
}
