import { UserDtoTests } from '@/ApplicationServices/dtos/Applicattion/user_test.dto';
import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import { Request } from 'express';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: UserDtoTests;
}

export default interface IAuthService {
  signup(userData: CreateUserDto): Promise<UserDtoTests>;
  login(userData: CreateUserDto): Promise<{ cookie: string; findUser: UserDtoTests }>;
  logout(userData: UserDtoTests): Promise<UserDtoTests>;
  createToken(user: UserDtoTests): TokenData;
  createCookie(tokenData: TokenData): string;
}
