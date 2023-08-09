/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @IsNotEmpty()
  id: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be a number with max dec places of 2' },
  )
  @IsPositive({ message: 'price can not be negative' })
  product_unit_price: number;

  @IsNumber(
    {},
    { message: 'Price should be a number with max dec places of 2' },
  )
  @IsPositive({ message: 'quantity can not be negative' })
  product_quantity: number;
}
