import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { OrdersProductsEntity } from './entities/orders-product.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { ProductEntity } from 'src/products/entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrdersProductsEntity,
      ShippingEntity,
      UserEntity,
      ProductEntity,
      CategoryEntity,
    ]),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService, CategoriesService],
  exports: [OrdersService],
})
export class OrdersModule {}
