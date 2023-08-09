import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersProductsEntity } from './entities/orders-product.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity)
    private readonly orderprodRepository: Repository<OrdersProductsEntity>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, currentUser: UserEntity) {
    const shippingEntity = new ShippingEntity();
    Object.assign(shippingEntity, createOrderDto.shippingAdress);

    const orderEntity = new OrderEntity();
    orderEntity.shippingAdress = shippingEntity;
    orderEntity.user = currentUser;

    const orderTbl = await this.orderRepository.save(orderEntity);

    const orderProdEntity: {
      order: OrderEntity;
      product: ProductEntity;
      product_quantity: number;
      product_unit_price: number;
    }[] = [];

    for (let i = 0; i < createOrderDto.orderedProducts.length; i++) {
      const order = orderTbl;
      const product = await this.productsService.findOne(
        createOrderDto.orderedProducts[i].id,
      );
      const product_quantity =
        createOrderDto.orderedProducts[i].product_quantity;
      const product_unit_price =
        createOrderDto.orderedProducts[i].product_unit_price;
      orderProdEntity.push({
        order,
        product,
        product_quantity,
        product_unit_price,
      });
    }
    const orderprod = await this.orderprodRepository
      .createQueryBuilder()
      .insert()
      .into(OrdersProductsEntity)
      .values(orderProdEntity)
      .execute();

    return await this.findOne(orderTbl.orderId);
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: {
        shippingAdress: true,
        user: true,
        products: { product: true },
      },
    });
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: { orderId: id },
      relations: {
        shippingAdress: true,
        user: true,
        products: { product: true },
      },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
