import { UpdateStockDto } from '@/ApplicationServices/dtos/Swagger/stock.dto';
import IStockRepository from '@/ApplicationServices/interfaces/stock/stock_repo.interface';
import prisma from '@/utils/db';
import { Stock } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class StockRepository implements IStockRepository {
  async findAllStock(): Promise<Stock[]> {
    /**
     * Find All Stocks
     */

    const stocks = await prisma.stock.findMany({});

    return stocks;
  }

  async findStockById(id: string): Promise<Stock> {
    /**
     * Find Stocks by Id
     */

    const stock = await prisma.stock.findUnique({
      where: {
        id: id,
      },
    });

    return stock;
  }

  async createStock(productId: string): Promise<Stock> {
    /**
     * Create Stocks for a Product
     */

    const stock = await prisma.stock.create({
      data: {
        currentStock: 0,
        neededStock: 0,
        product_WharehouseId: productId,
        version: 0,
      },
    });

    return stock;
  }

  async updateStock(id: string, stock: UpdateStockDto): Promise<Number> {
    /**
     * Update current stock and in need stock
     */

    try {
      const updatedStock = await prisma.stock.updateMany({
        where: {
          id: id,
          version: stock.version,
        },
        data: {
          currentStock: stock.current,
          neededStock: stock.needed,
          version: {
            increment: 1,
          },
        },
      });

      return updatedStock.count;
    } catch (error) {
      return null;
    }
  }
}
