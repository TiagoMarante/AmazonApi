import { Role } from '@prisma/client';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public cc: string;

  @IsString()
  @IsNotEmpty()
  public nif: string;

  @IsString()
  @IsNotEmpty()
  public photo: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public version: number;

  @IsArray()
  @IsNotEmpty()
  public permissions: Role[];
}
