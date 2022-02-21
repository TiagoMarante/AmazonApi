import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateUserDto } from '@/dtos/Swagger/users.dto';
import userService from '@services/users.service';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { UserDto } from '@/dtos/Applicattion/user.dto';
import { TYPES } from '@/../types';
import { injector } from '@/inversify.config';
import IUserService from '@/interfaces/user.interface';

@Controller()
export class UsersController {
  //public userService = new userService();
  public userService = injector.get<IUserService>(TYPES.IUserService);

  @Get('/users')
  @OpenAPI({ summary: 'Return a list of users' })
  async getUsers() {
    const findAllUsersData: UserDto[] = await this.userService.findAllUser();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Get('/users/:id')
  @OpenAPI({ summary: 'Return find a user' })
  async getUserById(@Param('id') userId: number) {
    const findOneUserData: UserDto = await this.userService.findUserById(userId);
    return { data: findOneUserData, message: 'findOne' };
  }

  @Post('/users')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @OpenAPI({ summary: 'Create a new user' })
  async createUser(@Body() userData: CreateUserDto) {
    const createUserData: UserDto = await this.userService.createUser(userData);
    return { data: createUserData, message: 'created' };
  }

  @Put('/users/:id')
  @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@Param('id') userId: number, @Body() userData: CreateUserDto) {
    const updateUserData: UserDto[] = await this.userService.updateUser(userId, userData);
    return { data: updateUserData, message: 'updated' };
  }

  @Delete('/users/:id')
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@Param('id') userId: number) {
    const deleteUserData: UserDto[] = await this.userService.deleteUser(userId);
    return { data: deleteUserData, message: 'deleted' };
  }
}
