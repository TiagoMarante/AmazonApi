import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import { validationMiddleware } from '@/Adapters/middlewares/validation.middleware';
import { TYPES } from '@/../types';
import { injector } from '@/inversify.config';
import IUserService from '@/ApplicationServices/interfaces/user.interface';
import { UserDto } from '@/ApplicationServices/dtos/Applicattion/user.dto';
import { onlyAdminsMiddleware } from '../middlewares/auth.middleware';

@Controller()
export class UsersController {
  //public userService = new userService();
  public userService = injector.get<IUserService>(TYPES.IUserService);

  @Get('/users')
  @UseBefore(onlyAdminsMiddleware)
  @OpenAPI({ summary: 'Return a list of Users' })
  async getUsers() {
    const findAllUsersData: UserDto[] = await this.userService.findAllUser();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Get('/users/:id')
  @UseBefore(onlyAdminsMiddleware)
  @OpenAPI({ summary: 'Return find a user' })
  async getUserById(@Param('id') userId: string) {
    const findOneUserData: UserDto = await this.userService.findUserById(userId);
    return { data: findOneUserData, message: 'findOne' };
  }

  @Post('/users')
  @UseBefore(onlyAdminsMiddleware)
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @OpenAPI({ summary: 'Create a new user' })
  async createUser(@Body() userData: CreateUserDto) {
    const createUserData: UserDto = await this.userService.createUser(userData);
    return { data: createUserData, message: 'created' };
  }

  @Put('/users/:id')
  @UseBefore(onlyAdminsMiddleware)
  @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@Param('id') userId: string, @Body() userData: CreateUserDto) {
    const updateUserData: UserDto = await this.userService.updateUser(userId, userData);
    if (updateUserData == null) {
      return { data: updateUserData, message: 'not updated' };
    }
    return { data: updateUserData, message: 'updated' };
  }

  @Delete('/users/:id')
  @UseBefore(onlyAdminsMiddleware)
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@Param('id') userId: string) {
    const deleteUserData: UserDto = await this.userService.deleteUser(userId);
    return { data: deleteUserData, message: 'deleted' };
  }
}
