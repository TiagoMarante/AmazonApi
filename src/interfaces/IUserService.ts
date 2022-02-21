import { CreateUserDto } from "@/dtos/Swagger/users.dto";
import { IUser } from "./users.interface";

export default interface IUserServices {

    findAllUser(): Promise<IUser[]>;
    findUserById(id: number): Promise<IUser>;
    createUser(userData: CreateUserDto) : Promise<IUser>;
    updateUser(userId: number, userData: CreateUserDto): Promise<IUser[]>;
    deleteUser(userId: number): Promise<IUser[]> ;
}