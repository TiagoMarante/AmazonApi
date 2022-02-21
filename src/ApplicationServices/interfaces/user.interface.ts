import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import { UserDto } from '../dtos/Applicattion/user.dto';

export default interface IUserService {
  findAllUser(): Promise<UserDto[]>;
  findUserById(id: string): Promise<UserDto>;
  createUser(userData: CreateUserDto): Promise<UserDto>;
  updateUser(userId: string, userData: CreateUserDto): Promise<UserDto>;
  deleteUser(userId: string): Promise<UserDto>;
}
