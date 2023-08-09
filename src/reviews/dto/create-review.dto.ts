import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'product should not br empty' })
  @IsNumber({}, { message: 'product should be a number' })
  prodId: number;
  @IsNotEmpty({ message: 'ratings should not be empty' })
  @IsNumber({}, { message: 'ratings should be a number' })
  ratings: number;
  @IsNotEmpty({ message: 'comments should not be empty' })
  @IsString()
  comment: string;
}
