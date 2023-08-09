import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductsService,
  ) {}
  async create(
    createReviewDto: CreateReviewDto,
    currentUser: UserEntity,
  ): Promise<ReviewEntity> {
    const product = await this.productService.findOne(createReviewDto.prodId);
    let review = await this.findOneByUserAndProduct(
      currentUser.id,
      createReviewDto.prodId,
    );
    if (!review) {
      review = this.reviewRepository.create(createReviewDto);
      review.user = currentUser;
      review.products = product;
    } else {
      (review.comment = createReviewDto.comment),
        (review.ratings = createReviewDto.ratings);
    }

    return await this.reviewRepository.save(review);
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: {
        user: true,
        products: {
          category: true,
        },
      },
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
  async findOneByUserAndProduct(userId: number, prodId: number) {
    return await this.reviewRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        products: {
          id: prodId,
        },
      },
      relations: {
        user: true,
        products: {
          category: true,
        },
      },
    });
  }
}
