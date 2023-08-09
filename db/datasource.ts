/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv'
import { UserEntity } from 'src/users/entities/user.entity';
import { Initial1690892702352 } from './migrations/1690892702352-initial';
import { UpdateTblUser1690966612061 } from './migrations/1690966612061-updateTbl_user';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { AddTBLProducts1691342086164 } from './migrations/1691342086164-addTBL_products';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { AddTBLReviews1691392697679 } from './migrations/1691392697679-AddTBL_reviews';
import { OrdersProductsEntity } from 'src/orders/entities/orders-product.entity';
import { ShippingEntity } from 'src/orders/entities/shipping.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { AddTBLOrdersOpShipping1691404628720 } from './migrations/1691404628720-AddTBL_orders_op_shipping';
config()
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_DATABASE,
  // entities: [UserEntity,CategoryEntity,ProductEntity,ReviewEntity,OrderEntity,OrdersProductsEntity,ShippingEntity],
  // migrations: [Initial1690892702352, UpdateTblUser1690966612061, AddTBLProducts1691342086164,AddTBLReviews1691392697679,AddTBLOrdersOpShipping1691404628720],
  entities: ["dist/**/*.entity{ .ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  logging: true,
  synchronize:  true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
