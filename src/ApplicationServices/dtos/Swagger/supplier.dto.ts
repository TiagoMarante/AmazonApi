import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class createSupplierDto {
  @IsString()
  @IsNotEmpty()
  public nif: string[];

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  public quantity_box: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public price_box: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public price_unit: number;
}
