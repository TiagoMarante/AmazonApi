import { Role, User } from '@prisma/client';

export class UserDto {
  id: string;
  username: string;
  email: string;
  password: string;
  cc: string;
  nif: string;
  imgId: string;
  //permissions: Role[];

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.cc = user.cc;
    this.nif = user.nif;
    this.imgId = user.imgId;
    //this.permissions = user.permissions;
  }
}
