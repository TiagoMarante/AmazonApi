import { Container } from 'inversify';
import { TYPES } from '../types';

import 'reflect-metadata';
import AuthService from './ApplicationServices/services/auth.service';
import IUserService from './ApplicationServices/interfaces/user.interface';
import IAuthService from './ApplicationServices/interfaces/auth.interface';
import IUserRepository from './ApplicationServices/interfaces/user_repo.interface';
import { UserService } from './ApplicationServices/services/users.service';
import { UserRepository } from './Adapters/repositories/users.repository';

const injector = new Container();

injector.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

injector.bind<IUserService>(TYPES.IUserService).to(UserService);
injector.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

export { injector };
