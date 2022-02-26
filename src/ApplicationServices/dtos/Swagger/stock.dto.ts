import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateStockDto {

  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public current: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public needed: number;
}
