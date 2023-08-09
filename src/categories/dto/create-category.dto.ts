import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Title can not be null' })
  @IsString({ message: 'Title should be a string.' })
  title: string;

  @IsNotEmpty({ message: 'Description can not be null' })
  @IsString({ message: 'Description should be a string.' })
  description: string;
}
