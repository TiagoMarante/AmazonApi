import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class UpdateStockDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public current: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  public needed: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public version: number;
}
