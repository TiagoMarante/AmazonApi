import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateSupplierProductDto {

  @IsString()
  @IsNotEmpty()
  public supplierId: string;

  @IsString()
  @IsNotEmpty()
  public product_WharehouseId: string;


  @IsNumber()
  @IsNotEmpty()
  public quantity_box: number;

  @IsNumber()
  @IsNotEmpty()
  public price_box: number;

  @IsNumber()
  @IsNotEmpty()
  public price_unit: number;


  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public version: number;
}
