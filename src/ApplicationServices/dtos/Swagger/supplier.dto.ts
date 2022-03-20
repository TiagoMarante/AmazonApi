import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  public nif: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public version: number;
}
