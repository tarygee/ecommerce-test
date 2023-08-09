/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersSignUpDto } from './dto/user-signup.dto';
import { UsersSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from './utility/decorators/current-user.decorator';
import { AuthenticationGuard } from './utility/guards/authentication.guard';
import { AuthorizeGuard } from './utility/guards/authorization.guard';
import { Roles } from './utility/common/user-roles.enum';
import { AuthorizeRoles } from './utility/decorators/authorize-role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(
    @Body() usersSignUpDto: UsersSignUpDto,
  ): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signup(usersSignUpDto) };
  }

  @Post('signin')
  async signin(@Body() usersSignInDto: UsersSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }> {
    const user = await this.usersService.signin(usersSignInDto);
    const accessToken = await this.usersService.accessToken(user);
    return { accessToken, user };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
    return 'hi';
  }

  // @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }
}
