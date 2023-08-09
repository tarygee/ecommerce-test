/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'shippings' })
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column({ default: '' })
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postCode: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @OneToOne(() => OrderEntity, (order) => order.shippingAdress)
  order: OrderEntity; 
}
