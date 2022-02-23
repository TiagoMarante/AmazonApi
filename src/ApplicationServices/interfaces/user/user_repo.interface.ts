import { User } from '@prisma/client';
import { CreateUserDto } from '../../dtos/Swagger/users.dto';

export default interface IUserRepository {
  findAllUser(): Promise<User[]>;
  findUserById(id: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  createUser(userData: CreateUserDto): Promise<User>;
  updateUser(id: string, userData: CreateUserDto): Promise<User>;
  deleteUser(id: string): Promise<User>;
}
