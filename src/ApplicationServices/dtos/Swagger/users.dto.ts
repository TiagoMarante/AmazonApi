import { Role } from '@prisma/client';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public cc: string;

  @IsString()
  public nif: string;

  @IsString()
  public photo: string;

  @IsArray()
  public permissions: Role[];
}
