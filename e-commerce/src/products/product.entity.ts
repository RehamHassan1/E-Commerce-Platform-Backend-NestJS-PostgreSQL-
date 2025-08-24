/* eslint-disable prettier/prettier */
import { Category } from 'src/category/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    category: string;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'categoryId' })
    categoryRelation: Category;

    @Column({ nullable: true })
    categoryId: number;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 0 })
    stock: number;

    @Column({ nullable: true })
    adminEmail: string;

    @Column({ nullable: true })
    image: string;
}