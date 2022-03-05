import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsArray()
  @IsNotEmpty()
  public img: string[];

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public grossweight: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public netWeight: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public width: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public lenght: number;

  @IsString()
  @IsNotEmpty()
  public hscode: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public price_acq: number;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  public price_aux: number[];

  @IsString()
  @IsNotEmpty()
  public ean: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public version: number;
}
