import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { UserEntity } from 'src/users/entities/user.entity';
import { ShippingEntity } from './shipping.entity';
import { OrdersProductsEntity } from './orders-product.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @Column({ nullable: true })
  productCode: number;

  @Column({ nullable: true })
  shippedAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.ordersUpdateBy)
  updatedBy: UserEntity;

  @OneToOne(() => ShippingEntity, (ship) => ship.order, { cascade: true })
  @JoinColumn()
  shippingAdress: ShippingEntity;

  @OneToMany(() => OrdersProductsEntity, (orderprod) => orderprod.order, {
    cascade: true,
  })
  products: OrdersProductsEntity[];

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
}
