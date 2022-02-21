import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import { HttpException } from '@exceptions/HttpException';
import IAuthService, { DataStoredInToken, TokenData } from '@/ApplicationServices/interfaces/auth.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { UserDtoTests } from '@/ApplicationServices/dtos/Applicattion/user_test.dto';
import { injectable } from 'inversify';
import config from 'config';

@injectable()
class AuthService implements IAuthService {
  //TODO repo
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<UserDtoTests> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDtoTests = this.users.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: UserDtoTests = { id: this.users.length + 1, ...userData, password: hashedPassword };

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: UserDtoTests }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDtoTests = this.users.find(user => user.email === userData.email);
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: UserDtoTests): Promise<UserDtoTests> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDtoTests = this.users.find(user => user.email === userData.email && user.password === userData.password);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: UserDtoTests): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
