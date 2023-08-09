import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title can not be null' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Description can not be null' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Price should not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price should be a nomber & max decimal precision 2' },
  )
  @IsPositive({ message: 'price should be apositive number' })
  price: number;

  @IsNotEmpty({ message: 'stock should not be empty' })
  @IsNumber({}, { message: 'price should be a number' })
  @Min(0, { message: 'stock can not be negative' })
  stock: number;

  @IsNotEmpty({ message: 'images should not be empty' })
  @IsArray({ message: 'images should be in array format' })
  images: string[];

  @IsNotEmpty({ message: 'category should not be empty' })
  @IsNumber({}, { message: 'category id should be a number' })
  categoryId: number;
}
