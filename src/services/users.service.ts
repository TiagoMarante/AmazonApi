import bcrypt from 'bcrypt';
import { CreateUserDto } from '@/dtos/Swagger/users.dto';
import { HttpException } from '@exceptions/HttpException';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { UserDto } from '@/dtos/Applicattion/user.dto';
import IUserService from '@/interfaces/user.interface';
import { injectable } from 'inversify';

@injectable()
class UserService implements IUserService{
  public users = userModel;

  public async findAllUser(): Promise<UserDto[]> {
    const users: UserDto[] = this.users;
    return users;
  }

  public async findUserById(userId: number): Promise<UserDto> {
    const findUser: UserDto = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<UserDto> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDto = this.users.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: UserDto = { id: this.users.length + 1, ...userData, password: hashedPassword };
    this.users = [...this.users, createUserData];

    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<UserDto[]> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDto = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserData: UserDto[] = this.users.map((user: UserDto) => {
      if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
      return user;
    });

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<UserDto[]> {
    const findUser: UserDto = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const deleteUserData: UserDto[] = this.users.filter(user => user.id !== findUser.id);
    return deleteUserData;
  }
}

export default UserService;
