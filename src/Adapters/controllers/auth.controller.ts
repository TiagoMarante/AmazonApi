import { Response } from 'express';
import { Controller, Req, Body, Post, UseBefore, HttpCode, Res } from 'routing-controllers';
import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import { RequestWithUser } from '@/ApplicationServices/interfaces/auth.interface';
import authMiddleware from '@/Adapters/middlewares/auth.middleware';
import { validationMiddleware } from '@/Adapters/middlewares/validation.middleware';
import AuthService from '@/ApplicationServices/services/auth.service';
import { UserDtoTests } from '@/ApplicationServices/dtos/Applicattion/user_test.dto';

@Controller()
export class AuthController {
  public authService = new AuthService();

  //TODO add another middleware for admin only
  @Post('/signup')
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @HttpCode(201)
  async signUp(@Body() userData: CreateUserDto) {
    const signUpUserData: UserDtoTests = await this.authService.signup(userData);
    return { data: signUpUserData, message: 'signup' };
  }

  @Post('/login')
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  async logIn(@Res() res: Response, @Body() userData: CreateUserDto) {
    const { cookie, findUser } = await this.authService.login(userData);

    res.setHeader('Set-Cookie', [cookie]);
    return { data: findUser, message: 'login' };
  }

  @Post('/logout')
  @UseBefore(authMiddleware)
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    const userData: UserDtoTests = req.user;
    const logOutUserData: UserDtoTests = await this.authService.logout(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    return { data: logOutUserData, message: 'logout' };
  }
}
