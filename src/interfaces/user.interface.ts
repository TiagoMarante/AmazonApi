import { UserDto } from "@/dtos/Applicattion/user.dto";
import { CreateUserDto } from "@/dtos/Swagger/users.dto";

export default interface IUserService {

    findAllUser(): Promise<UserDto[]>;
    findUserById(id: number): Promise<UserDto>;
    createUser(userData: CreateUserDto) : Promise<UserDto>;
    updateUser(userId: number, userData: CreateUserDto): Promise<UserDto[]>;
    deleteUser(userId: number): Promise<UserDto[]> ;
}