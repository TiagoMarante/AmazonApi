import { Response } from 'express';
import { Controller, Req, Body, Post, UseBefore, HttpCode, Res } from 'routing-controllers';
import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import IAuthService, { RequestWithUser } from '@/ApplicationServices/interfaces/auth.interface';
import { UserDto } from '@/ApplicationServices/dtos/Applicattion/user.dto';
import { LoginUserDto } from '@/ApplicationServices/dtos/Applicattion/user_login.dto';
import { injector } from '@/inversify.config';
import { TYPES } from '@/../types';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

@Controller()
export class AuthController {
  public authService = injector.get<IAuthService>(TYPES.IAuthService);

  //TODO add another middleware for admin only
  @Post('/signup')
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @HttpCode(201)
  async signUp(@Body() userData: CreateUserDto) {
    const signUpUserData: UserDto = await this.authService.signup(userData);
    return { data: signUpUserData, message: 'signup' };
  }

  @Post('/login')
  @UseBefore(validationMiddleware(LoginUserDto, 'body'))
  async logIn(@Res() res: Response, @Body() userData: LoginUserDto) {
    const { cookie, findUser } = await this.authService.login(userData);

    res.setHeader('Set-Cookie', [cookie]);
    return { data: findUser, message: 'login' };
  }

  @Post('/logout')
  @UseBefore(authMiddleware)
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    const userData: LoginUserDto = req.user;
    const logOutUserData: UserDto = await this.authService.logout(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    return { data: logOutUserData, message: 'logout' };
  }
}
