/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UsersSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async signup(usersSignUpDto: UsersSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(usersSignUpDto.email);
    if (userExists) throw new BadRequestException('Email is not available.');
    usersSignUpDto.password = await hash(usersSignUpDto.password, 10);
    let user = this.usersRepository.create(usersSignUpDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(usersSignInDto: UsersSignInDto): Promise<UserEntity> {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: usersSignInDto.email })
      .getOne();
    if (!userExists)
      throw new BadRequestException('Bad credentisld are entered');
    const matchPassword = await compare(
      usersSignInDto.password,
      userExists.password,
    );
    if (!matchPassword)
      throw new BadRequestException('Bad credentisld are entered');
    delete userExists.password;
    return userExists;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersRepository.find();
    return await this.usersRepository.save(users);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
    );
  }
}
