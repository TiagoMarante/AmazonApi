import { Role } from '@prisma/client';
import { Request } from 'express';
import { UserDto } from '../dtos/Applicattion/user.dto';
import { LoginUserDto } from '../dtos/Swagger/user_login.dto';

export interface DataStoredInToken {
  id: string;
  permissions: Role[];
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: UserDto;
}

export default interface IAuthService {
  login(userData: LoginUserDto): Promise<{ cookie: string; findUser: UserDto }>;
  logout(userData: LoginUserDto): Promise<UserDto>;
  createToken(user: UserDto): TokenData;
  createCookie(tokenData: TokenData): string;
}
