import { UserDto } from "@/ApplicationServices/dtos/Applicattion/user.dto";
import { CreateUserDto } from "@/ApplicationServices/dtos/Swagger/users.dto";


export default interface IUserService {
  findAllUser(): Promise<UserDto[]>;
  findUserById(id: string): Promise<UserDto>;
  createUser(userData: CreateUserDto): Promise<UserDto>;
  updateUser(userId: string, userData: CreateUserDto): Promise<UserDto>;
  deleteUser(userId: string): Promise<UserDto>;
}
