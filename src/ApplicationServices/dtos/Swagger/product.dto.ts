import { Role } from '@prisma/client';
import { IsArray, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

  @IsString()
  public name: string;

  @IsArray()
  public img: string[];

  @IsNumber()
  public grossweight: number;

  @IsNumber()
  public netWeight: number;

  @IsNumber()
  public width: number;

  @IsNumber()
  public lenght: number;

  @IsString()
  public hscode: string;
  
  @IsNumber()
  public price_acq: number;

  @IsNumber({},{each: true})
  public price_aux: number[];

  @IsString()
  public ean: string;
}
