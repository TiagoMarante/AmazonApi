import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@/ApplicationServices/interfaces/auth.interface';
import { TYPES } from '@/../types';
import { injector } from '@/inversify.config';
import IUserService from '@/ApplicationServices/interfaces/user.interface';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const userService = injector.get<IUserService>(TYPES.IUserService);

  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = jwt.verify(Authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await userService.findUserById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(404, 'Authentication token missing'));
  }
};

export const onlyAdminsMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const userService = injector.get<IUserService>(TYPES.IUserService);

  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = jwt.verify(Authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse.id;
      const permissions = verificationResponse.permissions;

      if (!permissions.includes('ADMIN')) {
        next(new HttpException(401, 'Not admin User'));
      }

      const findUser = await userService.findUserById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(404, 'Authentication token missing'));
  }
};
