import { CreateProductDto } from "@/ApplicationServices/dtos/Swagger/product.dto";
import { UpdateStockDto } from "@/ApplicationServices/dtos/Swagger/stock.dto";
import { Product_Wharehouse, Stock } from "@prisma/client";

export default interface IStockRepository {
  findAllStock(): Promise<Stock[]>;
  findStockById(id: string): Promise<Stock>;
  createStock(productId: string): Promise<Stock>;
  updateStock(id: string, stock: UpdateStockDto): Promise<Stock>;
}
