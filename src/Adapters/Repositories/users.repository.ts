import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import IUserRepository from '@/ApplicationServices/interfaces/user_repo.interface';
import prisma from '@/utils/db';
import {  Img, User } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {

  public async findAllUser(): Promise<User[]> {
    /**
     * Find All Users
     */

    const users = await prisma.user.findMany({});

    return users;
  }

  public async findUserById(id: string): Promise<User> {
    /**
     * Find User by Id
     */

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  public async findUserByEmail(email: string): Promise<User> {
    /**
     * Find User by Id
     */

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    /**
     * Create a User and Img, only admins can do this
     */
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        cc: userData.cc,
        nif: userData.nif,
        permissions: userData.permissions,
        img:{
          create:{
            photos: userData.photo
          }
        }
      },
    });


    return user;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    /**
     * Update all Fields of a User
     */

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          cc: userData.cc,
          nif: userData.nif,
          permissions: userData.permissions,
          img:{
            create:{
              photos: userData.photo
            }
          }
        },
      });

      return updatedUser;
    } catch (error) {
      return null;
    }
  }

  public async deleteUser(userId: string): Promise<User> {
    /**
     * Update all Fields of a User
     */

    const deleteUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return deleteUser;
  }
}
