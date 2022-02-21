import { UserDto } from '@/dtos/Applicattion/user.dto';
import { CreateUserDto } from '@/dtos/Swagger/users.dto';
import { Request } from 'express';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: UserDto;
}

export default interface IAuthService {
  signup(userData: CreateUserDto): Promise<UserDto>
  login(userData: CreateUserDto): Promise<{ cookie: string; findUser: UserDto }>
  logout(userData: UserDto): Promise<UserDto>
  createToken(user: UserDto): TokenData
  createCookie(tokenData: TokenData): string 
  
  
}