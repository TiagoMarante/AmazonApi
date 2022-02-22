import { CreateUserDto } from '@/ApplicationServices/dtos/Swagger/users.dto';
import IUserRepository from '@/ApplicationServices/interfaces/user_repo.interface';
import { prisma_db } from '@/utils/db';
import { User } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {
  public flag: boolean = JSON.parse(process.env.TEST);

  public async findAllUser(): Promise<User[]> {
    /**
     * Find All Users
     */

    const users = await prisma_db(this.flag).user.findMany({});

    return users;
  }

  public async findUserById(id: string): Promise<User> {
    /**
     * Find User by Id
     */

    const user = await prisma_db(this.flag).user.findUnique({
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

    const user = await prisma_db(this.flag).user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    /**
     * Create a User, only admins can do this
     */

    const user = await prisma_db(this.flag).user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        cc: userData.cc,
        nif: userData.nif,
        photo: userData.photo,
        permissions: userData.permissions,
      },
    });

    return user;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    /**
     * Update all Fields of a User
     */

    try {
      const updatedUser = await prisma_db(this.flag).user.update({
        where: {
          id: userId,
        },
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          cc: userData.cc,
          nif: userData.nif,
          photo: userData.photo,
          permissions: userData.permissions,
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

    const deleteUser = await prisma_db(this.flag).user.delete({
      where: {
        id: userId,
      },
    });

    return deleteUser;
  }
}
