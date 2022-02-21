

import { Container } from "inversify";
import { TYPES } from "../types";

import "reflect-metadata";
import AuthService from "./services/auth.service";
import IUserService from "./interfaces/user.interface";
import UserService from "./services/users.service";
import IAuthService from "./interfaces/auth.interface";


const injector = new Container();


injector.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
injector.bind<IUserService>(TYPES.IUserService).to(UserService);


export { injector };    

