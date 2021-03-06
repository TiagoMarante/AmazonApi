import { StockDto } from '@/ApplicationServices/dtos/Applicattion/stock.dto';
import { UpdateStockDto } from '@/ApplicationServices/dtos/Swagger/stock.dto';

export default interface IStockService {
  findAllStock(): Promise<StockDto[]>;
  findStockById(id: string): Promise<StockDto>;
  findStockByProductId(productId: string): Promise<StockDto>;
  createStock(product: string): Promise<StockDto>;
  updateStock(stock: UpdateStockDto): Promise<Number>;
}
