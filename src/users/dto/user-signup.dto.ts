/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { UsersSignInDto } from './user-signin.dto';
export class UsersSignUpDto extends UsersSignInDto{
  @IsNotEmpty({ message: 'Name can not be null' })
  @IsString({ message: 'Name should be string' })
  name: string;
}
