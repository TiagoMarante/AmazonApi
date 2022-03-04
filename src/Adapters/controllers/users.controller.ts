import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore, CookieParam } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import { validationMiddleware } from '@/Adapters/middlewares/validation.middleware';
import { TYPES } from '@/types';
import { injector } from '@/inversify.config';
import { UserDto } from '@/ApplicationServices/dtos/Applicattion/user.dto';
import { authMiddleware, onlyAdminsMiddleware } from '../middlewares/auth.middleware';
import { tokenToId } from '@/utils/token';
import IUserService from '@/ApplicationServices/interfaces/user/user_serv.interface';

@Controller()
export class UsersController {
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
  //@UseBefore(onlyAdminsMiddleware)
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @OpenAPI({ summary: 'Create a new user' })
  async createUser(@Body() userData: CreateUserDto) {
    const createUserData: UserDto = await this.userService.createUser(userData);
    return { data: createUserData, message: 'created' };
  }

  @Put('/users')
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@CookieParam('Authorization') res: string, @Body() userData: CreateUserDto) {
    const userId = tokenToId(res);
    const updateUserData: UserDto = await this.userService.updateUser(userId, userData);
    return { data: updateUserData, message: 'updated' };
  }

  @Delete('/users')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@CookieParam('Authorization') res: string) {
    const userId = tokenToId(res);

    const deleteUserData: UserDto = await this.userService.deleteUser(userId);
    return { data: deleteUserData, message: 'deleted' };
  }
}
