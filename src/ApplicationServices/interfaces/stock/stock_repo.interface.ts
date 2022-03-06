import { UpdateStockDto } from '@/ApplicationServices/dtos/Swagger/stock.dto';
import { Stock } from '@prisma/client';

export default interface IStockRepository {
  findAllStock(): Promise<Stock[]>;
  findStockById(id: string): Promise<Stock>;
  findStockByProductId(productId: string): Promise<Stock>;
  createStock(productId: string): Promise<Stock>;
  updateStock(id: string, stock: UpdateStockDto): Promise<Number>;
}
