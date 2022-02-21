import bcrypt from 'bcrypt';
import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import IUserService from '@/ApplicationServices/interfaces/user.interface';
import { injectable } from 'inversify';
import IUserRepository from '../interfaces/user_repo.interface';
import { injector } from '@/inversify.config';
import { TYPES } from '@/../types';
import { UserDto } from '../dtos/Applicattion/user.dto';

@injectable()
export class UserService implements IUserService {
  public usersRepository = injector.get<IUserRepository>(TYPES.IUserRepository);

  public async findAllUser(): Promise<UserDto[]> {
    const users: UserDto[] = await this.usersRepository.findAllUser();
    return users;
  }

  public async findUserById(userId: string): Promise<UserDto> {
    const findUser: UserDto = await this.usersRepository.findUserById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<UserDto> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDto = await this.usersRepository.findUserByEmail(userData.email);
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await this.usersRepository.createUser(userData);

    return newUser;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<UserDto> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDto = await this.usersRepository.findUserById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const updatedUser: UserDto = await this.usersRepository.updateUser(userId, userData);

    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<UserDto> {
    const findUser: UserDto = await this.usersRepository.findUserById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const deleteUserData: UserDto = await this.usersRepository.deleteUser(userId);
    return deleteUserData;
  }
}
