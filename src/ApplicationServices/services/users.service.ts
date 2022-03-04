import bcrypt from 'bcrypt';
import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { injectable } from 'inversify';
import IUserRepository from '../interfaces/user/user_repo.interface';
import { injector } from '@/inversify.config';
import { UserDto } from '../dtos/Applicattion/user.dto';
import { User } from '@prisma/client';
import IUserService from '../interfaces/user/user_serv.interface';
import { TYPES } from '@/types';

@injectable()
export class UserService implements IUserService {
  public usersRepository = injector.get<IUserRepository>(TYPES.IUserRepository);

  public async findAllUser(): Promise<UserDto[]> {
    const users: User[] = await this.usersRepository.findAllUser();

    return this.listToDto(users);
  }

  public async findUserById(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) throw new HttpException(409, 'No User found with this key');

    const findUser: UserDto = new UserDto(user);

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<UserDto> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDto = await this.usersRepository.findUserByEmail(userData.email);
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = await this.usersRepository.createUser(userData);
    if (!user) throw new HttpException(409, 'Error creating user');

    const newUser = new UserDto(user);

    return newUser;
  }

  public async updateUser(id: string, userData: CreateUserDto): Promise<UserDto> {
    if (isEmpty(userData)) throw new HttpException(400, 'No user data given');

    const findUser: UserDto = await this.usersRepository.findUserById(id);
    if (!findUser) throw new HttpException(409, 'No user found with this key');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await this.usersRepository.updateUser(id, userData);
    if (!newUser) throw new HttpException(409, 'Error updating user');

    const updatedUser: UserDto = new UserDto(newUser);
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<UserDto> {
    const findUser: UserDto = await this.usersRepository.findUserById(id);
    if (!findUser) throw new HttpException(409, 'No user found with this key');

    const user = await this.usersRepository.deleteUser(id);
    if (!user) throw new HttpException(409, 'Error deleting user');

    const deleteUserData: UserDto = new UserDto(user);
    return deleteUserData;
  }

  private listToDto(list: User[]): UserDto[] {
    const userList: UserDto[] = [];

    list.map(elem => {
      userList.push(new UserDto(elem));
    });

    return userList;
  }
}
